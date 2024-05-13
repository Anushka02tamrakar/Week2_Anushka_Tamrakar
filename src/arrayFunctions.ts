export function performArrayStringFunctions(array: number[], stringToSplit: string, output: { [key: string]: any }): void {
    // Concat
    const newArray1: number[] = array.concat([6, 7, 8]);
    output["Concat"] = newArray1;

    // LastIndexOf
    const index: number = array.lastIndexOf(3);
    output["LastIndexOf"] = index;

    // Push
    array.push(6);
    output["Push"] = array;

    // Splice
    const splicedArray: number[] = array.splice(1, 2);
    output["Splice"] = splicedArray;

    // Pop
    const poppedItem: number | undefined = array.pop();
    output["Pop"] = poppedItem;

    // Slice
    output["Slice"] = array.slice(1, 3);

    // map
    output["Map"] = array.map((item) => item * 2);

    // Shift
    output["Shift"] = array.shift();

    // Filter
    output["Filter"] = array.filter((item) => item > 2);

    // Unshift
    array.unshift(0);
    output["Unshift"] = array;

    // ForEach
    array.forEach((item) => console.log("ForEach:", item));

    // Flat
    const nestedArray: number[][] = [[1, 2], [3, 4], [5, 6]];
    output["Flat"] = nestedArray.flat();

    // Find
    output["Find"] = array.find((item) => item === 3);

    // Join
    output["Join"] = array.join("-");

    // FindIndex
    output["FindIndex"] = array.findIndex((item) => item === 4);

    // toString
    output["ToString"] = array.toString();

    // Some
    output["Some"] = array.some((item) => item > 3);

    // split
    output["Split"] = stringToSplit.split(" ");

    // Every
    output["Every"] = array.every((item) => item > 0);

    // replace
    output["Replace"] = stringToSplit.replace("World", "Universe");

    // Includes
    output["Includes"] = array.includes(3);

    // IndexOf
    output["IndexOf"] = array.indexOf(2);
}
