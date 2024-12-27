/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @Company Entropy Techoologies
 * @Author Alberto Barrera Aponte
*/

import { EntryPoints } from 'N/types';
import * as search from "N/search";
import * as log from "N/log";
import { Search } from "N/search";

function pageInit(context: EntryPoints.Client.pageInitContext): void {
    const entity_id = String(context.currentRecord.getValue('entity'));
    try {
        console.log('Page is initialized (TS Client Script)');
        const filters = [['entity', 'is', entity_id as String]];
        const sales_orders_search:Search = search.create({
            type: 'salesorder',
            columns: ['internalid', 'trandate', 'total'],
            filters: filters
        });

        const results = sales_orders_search.run().getRange({ start: 0, end: 1000 });
        if (results.length > 0) {
            results.forEach(function (result) {
                log.audit('Sales Order Found', {
                    id: result.getValue('internalid'),
                    date: result.getValue('trandate'),
                    total: result.getValue('total'),
                });
            });
        } else {
            log.audit({
                title: 'No Sales Orders',
                details: 'No Sales Orders found for this customer'
            });
        }
    } catch (e) {
        console.error('Error in pageInit: ', e.message);
    }
};

export = {
    pageInit: pageInit
};