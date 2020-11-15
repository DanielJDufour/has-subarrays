# has-subarrays
Quickly Determine if an Array contains Subarrays

# install
```bash
npm install has-subarrays
```

# usage
```javascript
const hasSubArrays = require("has-subarrays");

const numbers_one_to_ten = [1,2,3,4,5,6,7,8,9,10];

const { result } = hasSubArrays({
    data: numbers_one_to_ten,
    debug: true, // turn on for extra logging
    subarrays: {
        'one then two': [1, 2],
        'three then four': [3, 4]
    }
});
// result is true
```

# setting a threshold
You can specify a threshold, the number of unique matches after which it will return true.
If you don't specify a threshold, it will assume all subarrays must be found.
```javascript
const { result } = hasSubArrays({
    data: numbers_one_to_ten,
    debug: true, // turn on for extra logging
    subarrays: {
        'one then two': [1, 2],
        'three then four': [3, 4]
    },
    threshold: 1 // only one of the two subarrays must be found
});
// result is true
```
