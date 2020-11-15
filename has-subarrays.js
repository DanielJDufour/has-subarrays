function len (arr) {
    if (arr.length !== undefined) return arr.length;
    if (arr.byteLength !== undefined) return arr.byteLength;
}
function hasSubArrays ({ data, debug=false, targets, start, end=null, reverse=false, threshold=null }) {

    if (!data) throw new Error("[has-subarrays] you must specify data");

    if (start === undefined || start === null) start = 0;
    if (end === undefined || end === null) end = len(data) - 1;
    if (threshold === undefined || threshold === null) threshold = Object.keys(targets).length;
    
    // create indexed search tree
    const tree = {};

    for (let name in targets) {
        // if (debug) console.log("[has-subarrays] name:", name);
        const sequence = targets[name];
        let branch = tree;
        for (let i = 0; i < sequence.length - 1; i++) {
            const byte = sequence[i];
            if (!branch[byte]) branch[byte] = {};
            branch = branch[byte];
        }
        branch[sequence[sequence.length - 1]] = name;
        // console.log("tree (after branch):", tree);
    }
    if (debug) console.log("tree:", tree);

    // search
    const found = new Set();
    for (let i = start; i <= end; i++) {
        if (debug) console.log("i:", i);
        let branch = tree
        // need to add in pruning parents
        for (let ii = i; ii <= end; ii++) {
            if (debug) console.log("ii:", ii);
            const next = data[ii];
            const type = typeof branch[next];
            if (debug) console.log("type:", type);
            if (type === "undefined") {
                break;
            } else if (type === "object") {
                branch = branch[next];
                if (debug) console.log("found branch object", branch);
            } else if (type === "string") {
                if (debug) console.log("found end:", branch);
                found.add(branch[next]);
                delete branch[next];
                if (found.size === threshold) {
                    return { found: threshold, result: true, threshold, tree };
                }
            }
        }
    }
    
    
    return { tree };
};

if (typeof module === 'object') module.exports = hasSubArrays;
if (typeof window !== 'undefined') window.hasSubArrays = hasSubArrays;
if (typeof self !== 'undefined') self.hasSubArrays = hasSubArrays;
