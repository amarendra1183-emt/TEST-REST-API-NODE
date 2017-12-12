'use strict'
var index = 'assets',
    type = 'asset',
    size = 1000;

var get_assets_by_class_name = function (contractId, class_name, system, sub_system,
    function_name, sub_functional_unit, level1, level2, level3, level4,
    secondSearch, thirdSearch, filterOption) {
    var query = {
        query: {
            bool: {
                must: [
                    {
                        term: { contract: contractId }
                    }
                ]
            }
        }
    };
    var filter = {
        filter: {
            or: {
                filters: [
                    { term: { 'change_flag.raw': 'pending' } },
                    { term: { 'change_flag.raw': 'latest' } }
                ],
                and: {
                    filters: []
                }
            }
        }
    };
    query.query.bool.must.push({ term: { 'class.raw': class_name } });
    if (system) {
        filter.filter.or.and.filters.push({ term: { 'discipline.raw': system } });
    }
    if (sub_system) {
        filter.filter.or.and.filters.push({ term: { 'sub discipline.raw': sub_system } });
    }
    if (function_name) {
        filter.filter.or.and.filters.push({ term: { 'function.raw': function_name } });
    }
    if (sub_functional_unit) {
        filter.filter.or.and.filters.push({ term: { 'sub functional unit.raw': sub_functional_unit } });
    }
    if (level1) {
        filter.filter.or.and.filters.push({ term: { 'level1.raw': level1 } });
    }
    if (level2) {
        filter.filter.or.and.filters.push({ term: { 'level2.raw': level2 } });
    }
    if (level3) {
        filter.filter.or.and.filters.push({ term: { 'level3.raw': level3 } });
    }
    if (level4) {
        filter.filter.or.and.filters.push({ term: { 'level4.raw': level3 } });
    }
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                filtered: {
                    query: query.query,
                    filter: filter.filter
                }
            }
        }
    })
}

module.exports = {
    get_assets_by_class_name: function (contractId, class_name, system, sub_system,
        function_name, sub_functional_unit, level1, level2, level3, level4,
        secondSearch, thirdSearch, filterOption) {
        return get_assets_by_class_name(contractId, class_name, system, sub_system,
            function_name, sub_functional_unit, level1, level2, level3, level4,
            secondSearch, thirdSearch, filterOption);
    }
}