import express, { Request, Response } from 'express';
import { performArrayStringFunctions } from './arrayFunctions'
import * as studentUtils from './studentUtils';
import bodyParser from 'body-parser';
import pool from './pgConfig';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

// Define the structure of the items
interface OrderBlock {
    lineNo: number | number[];
    ProductCode: string;
}

interface Item {
    orderID: string;
    orderInvoiceNo: string;
    OrderBlocks: OrderBlock[];
}

app.post('/processOrders', async (req: Request<{}, {}, { items: Item[] }>, res: Response) => {
    try {
        const { items } = req.body;

        // Filter out orders based on the criteria
        const filteredOrders = items.filter(item =>
            item.OrderBlocks.some(block =>
                Array.isArray(block.lineNo) ?
                    block.lineNo.some(line => line % 3 !== 0) :
                    block.lineNo % 3 !== 0
            )
        );

        // Extract orderIDs
        const orderIDs = filteredOrders.map(order => order.orderID);

        // Iterate over orderIDs and store them in the database
        for (const orderID of orderIDs) {
            await pool.query('INSERT INTO orders (orderID) VALUES ($1)', [orderID]);
        }

        res.status(200).json({ message: 'Orders processed and stored successfully.' });
    } catch (error) {
        console.error('Error processing orders:', error);
        res.status(500).json({ error: 'An error occurred while processing orders.' });
    }
});
//students
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
]

// Endpoint to test filterPassedStudents
app.get('/filterPassedStudents', (req: Request, res: Response) => {
    const passedStudents = studentUtils.filterPassedStudents(students);
    res.json(passedStudents);
});

// Endpoint to test getStudentNames
app.get('/getStudentNames', (req: Request, res: Response) => {
    const studentNames = studentUtils.getStudentNames(students);
    res.json(studentNames);
});

// Endpoint to test sortStudentsByGrade
app.get('/sortStudentsByGrade', (req: Request, res: Response) => {
    const sortedStudents = studentUtils.sortStudentsByGrade(students);
    res.json(sortedStudents);
});

// Endpoint to test getAverageAge
app.get('/getAverageAge', (req: Request, res: Response) => {
    const averageAge = studentUtils.getAverageAge(students);
    res.json({ averageAge });
});


app.post('/array_operations', (req: Request, res: Response) => {
    const array: number[] = req.body.array;
    const stringToSplit: string = req.body.stringToSplit || '';
    const output: { [key: string]: any } = {};

    if (!array || !Array.isArray(array)) {
        return res.status(400).json({ error: 'Invalid array provided in the payload' });
    }

    performArrayStringFunctions(array, stringToSplit, output);

    return res.status(200).json({ output });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
