//
//  MainViewController.m
//  HippyDemo
//
//  Created by jonasluo on 2023/2/28.
//

#import "MainViewController.h"
#import "ViewController.h"
#import "HippyDemo-Swift.h"

@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    UIButton *KTV = [UIButton buttonWithType:UIButtonTypeCustom];
    KTV.backgroundColor = [UIColor redColor];
    KTV.frame = CGRectMake(50, 100, 50, 50);
    [KTV setTitle:@"KTV" forState:UIControlStateNormal];
    [self.view addSubview:KTV];
    [KTV addTarget:self action:@selector(gotoKtv) forControlEvents:UIControlEventTouchUpInside];
    
    UIButton *hippyBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    hippyBtn.backgroundColor = [UIColor redColor];
    hippyBtn.frame = CGRectMake(50, 200, 50, 50);
    [hippyBtn setTitle:@"hippy" forState:UIControlStateNormal];
    [self.view addSubview:hippyBtn];
    [hippyBtn addTarget:self action:@selector(gotoHippy) forControlEvents:UIControlEventTouchUpInside];
}

- (void)gotoKtv
{
    UIViewController *vc = [[KTVContent new] makeVc];
    vc.modalPresentationStyle = UIModalPresentationFullScreen;
    [self presentViewController:vc animated:YES completion:nil];
}

- (void)gotoHippy
{
    ViewController *hippyVc = [ViewController new];
    hippyVc.modalPresentationStyle = UIModalPresentationFullScreen;
    [self presentViewController:hippyVc animated:YES completion:nil];
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
