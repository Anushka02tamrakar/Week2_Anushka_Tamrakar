const data = {
    "items": [
        {
            "orderID": "0000001211",
            "orderInvoiceNo": "1234567",
            "OrderBlocks": [
                {
                    "lineNo": [1,4,6,8,9,1,4],
                    "ProductCode": "#31451"
                },
                {
                    "lineNo": 2,
                    "ProductCode": "#64311"
                },
                {
                    "lineNo": 3,
                    "ProductCode": "#85959"
                }
            ]
        },
        {
            "orderID": "0000001212",
            "orderInvoiceNo": "1234568",
            "OrderBlocks": [
                {
                    "lineNo": 7,
                    "ProductCode": "#86869"
                },
                {
                    "lineNo": [6,7,4,8,4,2],
                    "ProductCode": "#10384"
                },
                {
                    "lineNo": 12,
                    "ProductCode": "#00873"
                }
            ]
        },
        {
            "orderID": "0000001213",
            "orderInvoiceNo": "1234569",
            "OrderBlocks": [
                {
                    "lineNo": 76,
                    "ProductCode": "#22291"
                }
            ]
        }
    ]
};

// console.log(data); // Use the data as needed in your project


interface Item {
    orderID: string;
    orderInvoiceNo: string;
    OrderBlocks: OrderBlock[];
}

interface OrderBlock {
    lineNo: number | number[];
    ProductCode: string;
}

export function filterOrders(items: Item[]): Item[] {
    const filteredOrders: Item[] = [];

    for (const item of items) {
        let hasDivisibleLineNo = false;
        for (const block of item.OrderBlocks) {
            if (Array.isArray(block.lineNo)) {
                for (const lineNo of block.lineNo) {
                    if (typeof lineNo === 'number' && lineNo % 3 === 0) {
                        hasDivisibleLineNo = true;
                        break;
                    }
                }
            } else {
                if (typeof block.lineNo === 'number' && block.lineNo % 3 === 0) {
                    hasDivisibleLineNo = true;
                    break;
                }
            }
        }

        if (!hasDivisibleLineNo) {
            filteredOrders.push(item);
        }
    }

    return filteredOrders;
}
