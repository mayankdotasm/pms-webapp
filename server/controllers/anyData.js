import directQuery from '../models/directquery.js';

export const getResponse = async (req, res, next) => {
    try {
        const { query } = req.body;
        const [result, _] = await directQuery.retrievalQuery(query);
        res.status(200).json({result});
    } catch (error) {
        console.error(error);
        next(error);
    }
}
export const getTable = async (req, res, next) => {
    try {
        const { table } = req.params;
        const result = await directQuery.tablesRetrieval(table);
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        next(error);
    }
}