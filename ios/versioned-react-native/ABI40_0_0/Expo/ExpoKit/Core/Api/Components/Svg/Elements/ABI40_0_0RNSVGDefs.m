/**
 * Copyright (c) 2015-present, Horcrux.
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
#import "ABI40_0_0RNSVGDefs.h"

@class ABI40_0_0RNSVGNode;

@implementation ABI40_0_0RNSVGDefs

- (void)renderTo:(CGContextRef)context
{
    // Defs do not render
}

- (void)parseReference
{
    self.dirty = false;
    [self traverseSubviews:^(ABI40_0_0RNSVGNode *node) {
        if ([node isKindOfClass:[ABI40_0_0RNSVGNode class]]) {
            [node parseReference];
        }
        return YES;
    }];
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    return nil;
}

@end

