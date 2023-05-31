import React from 'react';
import {
  Text,
  ListView,
  View,
  StyleSheet,
} from '@hippy/react';
import Card from './Card';
  
export default class Demo extends React.Component {

    mockDataSource() {
        const newDataList = [
            {
              title: '取消售后申请',
              detailInfo: '撤销售后申请\n进入开始流程',
              avatarUrl: 'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
            },
            {
              title: '同意售后申请',
              detailInfo: '商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼',
              avatarUrl: 'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
            },
            {
              title: '发起售后申请',
              detailInfo: '发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件',
              avatarUrl: 'https://p3.toutiaoimg.com/large/pgc-image/54b93ce31b2e47c3aa1224b8fbfe4ffa',
              pictures: [
                'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
              ],
            },
            {
                title: '取消售后申请',
                detailInfo: '撤销售后申请\n进入开始流程',
                avatarUrl: 'https://img.yxwoo.com:4433/uploads/images/20191118/20191118121855_33359.jpg',
            },
            {
                title: '发起售后申请',
                detailInfo: '发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件',
                avatarUrl: 'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                pictures: [
                    'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                    'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                    'https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg',
                  ],    
            },
        ];

        newDataList.push({
            title: "取消售后申请",
            detailInfo: "撤销售后申请",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "取消售后申请",
            detailInfo: "商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "同意售后申请",
            detailInfo: "商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "发起售后申请",
            detailInfo: "发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            pictures: [
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fotojet-2022-02-03t140535-438-1643869859.jpg?crop=0.499xw:0.990xh;0.00163xw,0.00977xh&resize=640:*",
                "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/fotojet-2022-02-03t140535-438-1643869859.jpg?crop=0.499xw:0.990xh;0.00163xw,0.00977xh&resize=640:*",
            ]
        });
        newDataList.push({
            title: "同意售后申请",
            detailInfo: "商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "发起售后申请",
            detailInfo: "发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            pictures: [
                "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            ]
        });
        newDataList.push({
            title: "同意售后申请",
            detailInfo: "商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "同意售后申请",
            detailInfo: "商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "发起售后申请",
            detailInfo: "发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title: "同意售后申请",
            detailInfo: "商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title:"发起售后申请",
            detailInfo: "发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件",
            avatarUrl:"https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            pictures: ["https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg"],
        });
        newDataList.push({
            title:"同意售后申请",
            detailInfo:"商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl:"https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
        });
        newDataList.push({
            title:"发起售后申请",
            detailInfo: "发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件",
            avatarUrl: "https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            pictures: ["https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg"],
        });
        newDataList.push({
            title:"同意售后申请",
            detailInfo:"商家已同意退货申请。\n退货地址：江苏省扬州市仪征新集镇迎宾路3号花藤印染院内亿合帽业二楼",
            avatarUrl:"https://p3.toutiaoimg.com/large/pgc-image/54b93ce31b2e47c3aa1224b8fbfe4ffa",
        });
        newDataList.push({
            title:"发起售后申 请",
            detailInfo:"发起了退货退款售后申请\n售后类型：退货退款\n货物状态：已收到货\n退货原因：7天无理由退款\n退款金额：¥59\n退货方式：线下寄件",
            avatarUrl:"https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg",
            pictures: ["https://pic2.zhimg.com/v2-2a0434dd4e4bb7a638b8df699a505ca1_b.jpg"],
        });

        setTimeout(() => {
            this.setState({
                dataSource: newDataList,
            })
        }, 100)
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        this.renderRow = this.renderRow.bind(this);
        this.getRowType = this.getRowType.bind(this);
        this.mockDataSource()
    }
    
    renderRow(index) {
        const { dataSource } = this.state;
        const item = dataSource[index];    
        return (
            <Card index={index} item={item} />
        )
    }
    getRowKey(index) {
        return `row-${index}`;
    }

    getRowType(index) {
        const { dataSource } = this.state;
        const item = dataSource[index];  
        console.log('getRowType')  
        console.log(index)
        return item.pictures && item.pictures.length > 0 ? 1: 2
    }

    render() {
        const { dataSource } = this.state;
        return (
            <ListView
              style={{ flex: 1 }}
              numberOfRows={dataSource.length}
              initialListSize={4}
              renderRow={this.renderRow}
              getRowKey={this.getRowKey}
              getRowType={this.getRowType}
            />
        );
    }
}