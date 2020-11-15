const test = require("ava");
const hasSubArrays = require("./has-subarrays");

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

test("has single sequence", t => {
  const arr = [...nums];
  const { result, threshold, tree } = hasSubArrays({
    data: arr,
    debug: false,
    subarrays: {
      one: [1],
      two: [2]
    }
  });
  t.deepEqual(tree, {});
  t.true(result);
  t.is(threshold, 2);
});

test("has double sequence", t => {
  const arr = Uint8Array.from(nums);
  const { result, threshold, tree } = hasSubArrays({
    data: arr,
    debug: false,
    subarrays: {
      "one-two": [1, 2],
      "three-four": [3, 4]
    }
  });
  t.deepEqual(tree, { 1: {}, 3: {} });
  t.true(result);
  t.is(threshold, 2);
});

test("has threshold set", t => {
  const arr = Uint8Array.from(nums);
  const { result, threshold, tree } = hasSubArrays({
    data: arr,
    debug: false,
    subarrays: {
      "five-six-seven": [5, 6, 7],
      "six-seven-eight": [6, 7, 8],
      "one-seven-nine": [1, 7, 9]
    },
    threshold: 2
  });
  t.deepEqual(tree, {
    1: { 7: { 9: "one-seven-nine" } },
    5: { 6: {} },
    6: { 7: {} }
  });
  t.true(result);
  t.is(threshold, 2);
});
