import { by, device, element, expect as detoxExpect, waitFor } from 'detox';

import { sleepAsync } from './Utils';
import { expectResults } from './utils/report';

let TESTS = [
  'Basic',
  // 'Asset',
  // 'FileSystem',
  // 'Font',
  'Permissions',
  'Blur',
  'LinearGradient',
  'Constants',
  // 'Contacts',
  'Crypto',
  // 'GLView',
  'Haptics',
  'Localization',
  // 'SecureStore',
  // 'Segment',
  // 'SQLite',
  'Random',
  'Permissions',
  'KeepAwake',
  'FirebaseCore',
  'FirebaseAnalytics',
  // 'Audio',
  'HTML',
];

const MIN_TIME = 50000;

describe('test-suite', () => {
  TESTS.map(testName => {
    it(
      `passes ${testName}`,
      async () => {
        await device.launchApp({
          newInstance: true,
          url: `bareexpo://test-suite/run?tests=${testName}`,
        });
        await sleepAsync(100);
        await detoxExpect(element(by.id('test_suite_container'))).toExist();
        try {
          await waitFor(element(by.id('test_suite_text_results')))
            .toExist()
            .withTimeout(MIN_TIME);
        } catch (err) {
          // test hasn't completed within the timeout
          // continue and log the intermediate results
        }
        const attributes = await element(by.id('test_suite_final_results')).getAttributes();

        const input = attributes.text;

        expectResults({
          testName,
          input,
        });
      },
      MIN_TIME * 1.5
    );
  });
});
