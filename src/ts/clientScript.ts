/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @Company Entropy Techoologies
 * @Author Alberto Barrera Aponte
*/

import { EntryPoints } from '@hitc/netsuite-types/N/types';
import search, { Search } from '@hitc/netsuite-types/N/search';

export let pageInit: EntryPoints.Client.pageInit = function (context: EntryPoints.Client.pageInitContext) {
    const entity_id = context.currentRecord.getValue('entity');
    console.log('Page is initialized (TS Client Script)');

    const filters = [['entity', 'is', entity_id]];
    const sales_orders_search:Search = search.create({
        type: 'salesorder',
        columns: ['internalid', 'trandate', 'total'],
        filters: filters
    });
    const results = sales_orders_search.run().getRange({start: 0, end: 100});
    if(results.length > 0) {
        results.forEach(function(result) {
            console.log('Sales Order Id: ' + result.getValue('internalid'));
            console.log('Sales Order Date: ' + result.getValue('trandate'));
            console.log('Sales Order Total: ' + result.getValue('total'));
            return true;
        });
    }
};