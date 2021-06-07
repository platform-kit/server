var fs = require('fs')

var apiSchema = fs.readFileSync('./app/prisma/api-schema/api-schema.json', { encoding: 'utf8', flag: 'r' })
apiSchema = JSON.parse(apiSchema);
var schemas = Object.entries(apiSchema.schemas)

function getGraphQLSchemas() {
    var types = [];
    for (const [key, value] of Object.entries(schemas)) {
        var type = value[0];
        var endpoints = Object.entries(value[1]);
        for (const [endpointKey, endpointValue] of endpoints) {
            if (endpointValue != null && endpointValue['input_validation_rules'] != null) {
                rules = Object.entries(endpointValue['input_validation_rules']);
                var startLine = ` type ` + type + ` {`
                var fieldLines = {};
                for (const [fieldName, rulesValue] of rules) {
                    var fieldType = null;
                    if (rulesValue.includes('string')) {
                        fieldType = 'String';
                    }
                    if (rulesValue.includes('integer')) {
                        fieldType = 'Int';
                    }
                    if (rulesValue.includes('numeric')) {
                        fieldType = 'Float';
                    }
                    if (rulesValue.includes('boolean')) {
                        fieldType = 'Boolean';
                    }

                    var fieldLine = `   ` + fieldName + `: ` + fieldType;
                    fieldLines[fieldName] = fieldLine;
                }
                var endLine = `}`;
                types[type] = { startLine: startLine, fieldLines: fieldLines, endLine: endLine };
            }
        }
    }

    // Generate the Types portion of the schema string
    var string = '';
    for (const [type, lines] of Object.entries(types)) {
        string = string + '\n' + lines.startLine;
        for (const [lineName, lineValue] of Object.entries(lines.fieldLines)) {
            string = string + '\n' + lineValue;
        }
        string = string + '\n' + lines.endLine + '\n';
    }

    // Generate the Query portion of the schema string
    string = string + '\n';
    var queryString = `
    type Query { 
    `;
    schemas = Object.entries(apiSchema.schemas);
    for (const [key, value] of schemas) {
        queryString = queryString + '   ' + key + ': [' + key + ']\n';        
    }
    queryString = queryString + `
    }`;
    string = string + queryString;
    
    return string;

    // GraphQL Schema String example:
    /*
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    # This "Book" type defines the queryable fields for every book in our data source.
    
    type Book {
        title: String
        name: String
        author: String
    }
    
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    
    type Query {
        books: [Book]
    }
    */
}

module.exports = {
    getGraphQLSchemas
}