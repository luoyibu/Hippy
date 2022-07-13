#include "footstone/deserializer.h"

#include <cstring>

#include "footstone/logging.h"
#include "footstone/unicode_string_view.h"
#include "footstone/string_view_utils.h"
#include "footstone/hippy_value.h"
#include "footstone/serializer.h"

namespace footstone {
inline namespace value {

using unicode_string_view = footstone::stringview::unicode_string_view;

Deserializer::Deserializer(const std::vector<const uint8_t>& data)
    : position_(&data[0]), end_(&data[0] + data.size()) {}

Deserializer::Deserializer(const uint8_t* data, size_t size) : position_(data), end_(data + size) {}

Deserializer::~Deserializer() = default;

bool Deserializer::ReadValue(HippyValue& value) {
  bool ret = ReadObject(value);
  return ret;
}

void Deserializer::ReadHeader() {
  if (position_ < end_ && *position_ == static_cast<uint8_t>(SerializationTag::kVersion)) {
    SerializationTag tag;
    ReadTag(tag);
    version_ = ReadVarint<uint32_t>();
    FOOTSTONE_DCHECK(version_ <= kLatestVersion);
  }
}

bool Deserializer::PeekTag(SerializationTag& tag) {
  const uint8_t* peek_position = position_;
  do {
    if (peek_position >= end_) return false;
    tag = static_cast<SerializationTag>(*peek_position);
    peek_position++;
  } while (tag == SerializationTag::kPadding);
  return true;
}

bool Deserializer::ReadTag(SerializationTag& tag) {
  do {
    if (position_ >= end_) return false;
    tag = static_cast<SerializationTag>(*position_);
    position_++;
  } while (tag == SerializationTag::kPadding);
  return true;
}

void Deserializer::ConsumeTag(SerializationTag peek_tag) {
  SerializationTag tag;
  ReadTag(tag);
  FOOTSTONE_DCHECK(tag == peek_tag);
}

bool Deserializer::ReadInt32(int32_t& value) {
  value = ReadZigZag<int32_t>();
  return true;
}

bool Deserializer::ReadInt32(HippyValue& dom_value) {
  dom_value = HippyValue(ReadZigZag<int32_t>());
  return true;
}

bool Deserializer::ReadUInt32(uint32_t& value) {
  value = ReadVarint<uint32_t>();
  return true;
}

bool Deserializer::ReadUInt32(HippyValue& dom_value) {
  dom_value = HippyValue(ReadVarint<uint32_t>());
  return true;
}

bool Deserializer::ReadDouble(double& value) {
  if (sizeof(double) > static_cast<unsigned>(end_ - position_)) return false;
  memcpy(&value, position_, sizeof(double));
  position_ += sizeof(double);
  if (std::isnan(value)) value = std::numeric_limits<double>::quiet_NaN();
  return true;
}

bool Deserializer::ReadDouble(HippyValue& dom_value) {
  if (sizeof(double) > static_cast<unsigned>(end_ - position_)) return false;
  double value;
  memcpy(&value, position_, sizeof(double));
  position_ += sizeof(double);
  if (std::isnan(value)) value = std::numeric_limits<double>::quiet_NaN();
  dom_value = HippyValue(value);
  return true;
}

bool Deserializer::ReadUtf8String(std::string& value) {
  uint32_t utf8_length;
  utf8_length = ReadVarint<uint32_t>();
  if (utf8_length > static_cast<uint32_t>(end_ - position_)) return false;

  const uint8_t* start = const_cast<uint8_t*>(position_);
  position_ += utf8_length;
  unicode_string_view string_view(start, utf8_length);
  value = hippy::base::StringViewUtils::ToU8StdStr(string_view);
  return true;
}

bool Deserializer::ReadUtf8String(HippyValue& dom_value) {
  uint32_t utf8_length;
  utf8_length = ReadVarint<uint32_t>();
  if (utf8_length > static_cast<uint32_t>(end_ - position_)) return false;

  const uint8_t* start = position_;
  position_ += utf8_length;
  unicode_string_view string_view(start, utf8_length);
  dom_value = hippy::base::StringViewUtils::ToU8StdStr(string_view);
  return true;
}

bool Deserializer::ReadOneByteString(std::string& value) {
  uint32_t one_byte_length;
  one_byte_length = ReadVarint<uint32_t>();
  if (one_byte_length > static_cast<uint32_t>(end_ - position_)) return false;

  const char* start = reinterpret_cast<char*>(const_cast<uint8_t*>(position_));
  position_ += one_byte_length;
  unicode_string_view string_view(start, one_byte_length);
  value = hippy::base::StringViewUtils::ToU8StdStr(string_view);
  return true;
}

bool Deserializer::ReadOneByteString(HippyValue& dom_value) {
  uint32_t one_byte_length;
  one_byte_length = ReadVarint<uint32_t>();
  if (one_byte_length > static_cast<uint32_t>(end_ - position_)) return false;

  const char* start = reinterpret_cast<char*>(const_cast<uint8_t*>(position_));
  position_ += one_byte_length;
  unicode_string_view string_view(start, one_byte_length);
  dom_value = hippy::base::StringViewUtils::ToU8StdStr(string_view);
  return true;
}

bool Deserializer::ReadTwoByteString(std::string& value) {
  uint32_t two_byte_length;
  two_byte_length = ReadVarint<uint32_t>();
  if (two_byte_length > static_cast<uint32_t>(end_ - position_)) return false;

  const char16_t* start = reinterpret_cast<char16_t*>(const_cast<uint8_t*>(position_));
  position_ += two_byte_length;
  unicode_string_view string_view(start, two_byte_length);
  value = hippy::base::StringViewUtils::ToU8StdStr(string_view);
  return true;
}

bool Deserializer::ReadTwoByteString(HippyValue& dom_value) {
  uint32_t two_byte_length;
  two_byte_length = ReadVarint<uint32_t>();
  if (two_byte_length > static_cast<uint32_t>(end_ - position_)) return false;

  const char16_t* start = reinterpret_cast<char16_t*>(const_cast<uint8_t*>(position_));
  position_ += two_byte_length;
  unicode_string_view string_view(start, two_byte_length / sizeof(char16_t));
  dom_value = hippy::base::StringViewUtils::ToU8StdStr(string_view);
  return true;
}

bool Deserializer::ReadDenseJSArray(HippyValue& dom_value) {
  uint32_t length = ReadVarint<uint32_t>();
  FOOTSTONE_DCHECK(length <= static_cast<uint32_t>(end_ - position_));

  HippyValue::DomValueArrayType array;
  array.resize(length);

  for (uint32_t i = 0; i < length; i++) {
    SerializationTag tag;
    PeekTag(tag);
    if (tag == SerializationTag::kTheHole) {
      ConsumeTag(SerializationTag::kTheHole);
      continue;
    }

    HippyValue value;
    ReadObject(value);
    array[i] = value;
  }

  uint32_t num_properties;
  uint32_t expected_num_properties;
  uint32_t expected_length;
  num_properties = ReadObjectProperties(SerializationTag::kEndDenseJSArray);
  expected_num_properties = ReadVarint<uint32_t>();
  expected_length = ReadVarint<uint32_t>();
  if (num_properties != expected_num_properties) return false;
  if (length != expected_length) return false;

  dom_value = array;
  return true;
}

bool Deserializer::ReadJSObject(HippyValue& dom_value) {
  bool ret = true;
  uint32_t num_properties;
  HippyValueObjectType object;
  num_properties = ReadObjectProperties(object, SerializationTag::kEndJSObject);

  uint32_t expected_num_properties;
  expected_num_properties = ReadVarint<uint32_t>();
  if (num_properties != expected_num_properties) return false;

  dom_value = object;
  return ret;
}

template <typename T>
T Deserializer::ReadVarint() {
  // Reads an unsigned integer as a base-128 varint.
  // The number is written, 7 bits at a time, from the least significant to the
  // most significant 7 bits. Each byte, except the last, has the MSB set.
  // If the varint is larger than T, any more significant bits are discarded.
  // See also https://developers.google.com/protocol-buffers/docs/encoding
  static_assert(std::is_integral<T>::value && std::is_unsigned<T>::value,
                "Only unsigned integer types can be read as varints.");

  T value = 0;
  unsigned shift = 0;
  bool has_another_byte;
  do {
    FOOTSTONE_DCHECK(end_ > position_);
    uint8_t byte = *position_;
    if (shift < sizeof(T) * 8) {
      value |= static_cast<T>(byte & 0x7F) << shift;
      shift += 7;
    }
    has_another_byte = byte & 0x80;
    position_++;
  } while (has_another_byte);
  return value;
}

template <typename T>
T Deserializer::ReadZigZag() {
  // Writes a signed integer as a varint using ZigZag encoding (i.e. 0 is
  // encoded as 0, -1 as 1, 1 as 2, -2 as 3, and so on).
  // See also https://developers.google.com/protocol-buffers/docs/encoding
  static_assert(std::is_integral<T>::value && std::is_signed<T>::value,
                "Only signed integer types can be read as zigzag.");
  using UnsignedT = typename std::make_unsigned<T>::type;
  UnsignedT unsigned_value;
  unsigned_value = ReadVarint<UnsignedT>();
  return static_cast<T>((unsigned_value >> 1) ^ static_cast<unsigned int>(-static_cast<T>(unsigned_value & 1)));
}

bool Deserializer::ReadObject(HippyValue& value) {
  bool ret = false;
  SerializationTag tag;
  ReadTag(tag);
  switch (tag) {
    case SerializationTag::kUndefined: {
      value = HippyValue::Undefined();
      return true;
    }
    case SerializationTag::kNull: {
      value = HippyValue::Null();
      return true;
    }
    case SerializationTag::kTrue: {
      value = HippyValue(true);
      return true;
    }
    case SerializationTag::kFalse: {
      value = HippyValue(false);
      return true;
    }
    case SerializationTag::kInt32: {
      int32_t i32 = ReadZigZag<int32_t>();
      value = HippyValue(i32);
      return true;
    }
    case SerializationTag::kUint32: {
      uint32_t u32 = ReadVarint<uint32_t>();
      value = HippyValue(u32);
      return true;
    }
    case SerializationTag::kDouble: {
      double d;
      ReadDouble(d);
      value = HippyValue(d);
      return true;
    }
    case SerializationTag::kUtf8String: {
      ret = ReadUtf8String(value);
      return ret;
    }
    case SerializationTag::kOneByteString: {
      ret = ReadOneByteString(value);
      return ret;
    }
    case SerializationTag::kTwoByteString: {
      ret = ReadTwoByteString(value);
      return ret;
    }
    case SerializationTag::kBeginDenseJSArray: {
      ret = ReadDenseJSArray(value);
      return ret;
    }
    case SerializationTag::kBeginJSObject: {
      ret = ReadJSObject(value);
      return ret;
    }
    default: {
      ret = false;
    }
  }

  return ret;
}

uint32_t Deserializer::ReadObjectProperties(HippyValueObjectType& property, SerializationTag end_tag) {
  uint32_t num_properties = 0;
  HippyValue::HippyValueObjectType object;

  // Slow path.
  for (;; num_properties++) {
    SerializationTag tag;
    PeekTag(tag);
    if (tag == end_tag) {
      ConsumeTag(end_tag);
      return num_properties;
    }

    if (end_tag == SerializationTag::kEndJSObject) {
      HippyValue key;
      ReadObject(key);
      HippyValue value;
      ReadObject(value);
      object.insert(std::pair<std::string, HippyValue>(key.ToStringChecked(), value));
      property = object;
    }
  }
}

uint32_t Deserializer::ReadObjectProperties(SerializationTag end_tag) {
  uint32_t num_properties = 0;

  // Slow path.
  for (;; num_properties++) {
    SerializationTag tag;
    PeekTag(tag);
    if (tag == end_tag) {
      ConsumeTag(end_tag);
      return num_properties;
    }
  }
}

}  // namespace base
}  // namespace tdf