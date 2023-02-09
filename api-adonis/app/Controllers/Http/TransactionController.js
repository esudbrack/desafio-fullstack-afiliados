'use strict'
const Transaction = use("App/Models/Transaction");
const Database = use('Database')
const Helpers = use('Helpers')
const fs = require('fs');

class TransactionController {
    async import({request, response}) {
        try {
            const sales = request.file('sales', {
                extnames: ['txt'],
                size: '2mb'
            })

            await sales.move(Helpers.tmpPath('uploads'), {
                name: 'sales.txt',
                overwrite: true
            })

            if (!sales.moved()) {
                return sales.error()
            }

            // Split file content into array and remove empty lines
            let transactions = fs.readFileSync(`${Helpers.tmpPath('uploads')}/sales.txt`, 'utf8').toString().split("\n");
            transactions = transactions.filter(entry => entry.trim() != '');
            
            const convertLineToTransactionObject = (line) => {
                return {
                    type: Number(line.substr(0, 1)),
                    transaction_date: new Date(line.substr(1, 25)),
                    product_description: line.substr(26, 30).trim(),
                    value: Number(line.substr(56, 10)),
                    seller: line.substr(66, 20).trim()
                }
            }
    
            // Convert to an array of objects
            transactions = transactions.map(t => convertLineToTransactionObject(t))
    
            await Transaction.createMany(transactions)
    
            return response.status(200).json({
                status: "ok",
                message: "Transactions created with success"
            });
        } catch (error) {
            console.log(error.message);
            return response.status(403).json({
                status: "error",
                debug_error: error.message,
            });
        }
    }

    async list({ response }) {
        try {
            // Get total values by seller
            let sellers = await Database.raw(`SELECT SUM(CASE WHEN type = 3 THEN -value ELSE value END) AS total, seller AS name
                FROM transactions
                GROUP BY seller;`)

            // Then list all transactions by seller
            let transactions = await Transaction.all()
            transactions = transactions.toJSON()
            for (const seller of sellers) {
                seller.transactions = transactions.filter(t => (t.seller == seller.name))
            }

            return { sellers };
        } catch (error) {
            console.log(error.message);
            return response.status(403).json({
                status: "error",
                debug_error: error.message,
            });
        }
        
    }

}

module.exports = TransactionController
