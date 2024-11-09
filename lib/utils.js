/**
 * @param {any} param1
 * @param {any} param2
 * @param {boolean} [withOrder=false] withOrder
 * @returns {boolean}
 */
export function deepEqual(param1, param2, withOrder = false) {
    if (typeof param1 !== typeof param2) {
        return false;
    }

    switch (typeof param1) {
        case "string":
        case "number":
        case "boolean":
        case "undefined":
        case "bigint":
        case "symbol":
            return param1 === param2;
    }

    if (param1 === null || param2 === null) {
        return param1 === param2;
    }

    if (Array.isArray(param1)) {
        if (!Array.isArray(param2) || param1.length !== param2.length) {
            return false;
        }

        const arr1 = withOrder ? param1 : [...param1].sort();
        const arr2 = withOrder ? param2 : [...param2].sort();

        for (let i = 0; i < arr1.length; i++) {
            if (!deepEqual(arr1[i], arr2[i], withOrder)) {
                return false;
            }
        }
        return true;
    }

    const keys1 = Object.keys(param1);
    const keys2 = Object.keys(param2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    if (!withOrder) {
        keys1.sort();
        keys2.sort();
    }

    for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] !== keys2[i] || !deepEqual(param1[keys1[i]], param2[keys2[i]], withOrder)) {
            return false;
        }
    }

    return true;
}
