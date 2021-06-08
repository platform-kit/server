import { Prisma, PrismaClient } from '@prisma/client';
let Validator = require('validatorjs');
const prisma = new PrismaClient();
var fs = require('fs');
var pluralize = require('pluralize')

export class Resource {
    resourceType: string;

    constructor(type: string) {
        this.resourceType = type
    }

    getModel() {
        for (const [key, value] of Object.entries(prisma)) {
            if (typeof value == 'object' && key == this.resourceType) {
                return value
            }
        }
    }

    pluralizeType() {
        return pluralize.plural(this.resourceType)
    }

    singularizeType() {
        return pluralize.singular(this.resourceType)
    }

    async browse(options?: any) {
        if (options == null) {
            options = {
                take: 10,
                skip: 0
            }
        }
        var model = await this.getModel()
        try {
            var output = await model.findMany(options)
        } catch (err) {
            output = { error: err, message: "Something went wrong." }
        }
        return output
    }

    async read(options?: any) {               
        var model = await this.getModel()
        try {
            if(options.hasOwnProperty('id')){
                options = {where: options}
            }
            var output = await model.findUnique(options)
        } catch (err) {
            output = { error: err, message: "Something went wrong." }
        }
        console.log(output)
        return output
    }

    async add(data: any) {
        if(typeof data == 'string'){
            data = JSON.parse(data)
        }       
        var apiSchema = fs.readFileSync('./app/api-schema.json', { encoding: 'utf8', flag: 'r' })
        apiSchema = JSON.parse(apiSchema)
        var validationRules = apiSchema.schemas?.[this.pluralizeType()]?.['add']?.['input_validation_rules']
        console.log(validationRules)
        if (validationRules != null) {
            let validation = new Validator(data, validationRules);
            console.log(validation.passes())
            if (validation.fails()) {
                output = { validation: validation.errors, message: "Something went wrong." }
                return output
            }
        }

        var model = await this.getModel()
        var output = null
        try {
            const item = await model.create({data:data})
            output = item
        } catch (err) {
            output = { error: err, message: "Something went wrong." }
        }
        return output
    }

    async edit(id: Number, data: any) {
        if(typeof data == 'string'){
            data = JSON.parse(data)
        }      
        var apiSchema = fs.readFileSync('./app/api-schema.json', { encoding: 'utf8', flag: 'r' })
        apiSchema = JSON.parse(apiSchema)
        var validationRules = apiSchema.schemas?.[this.pluralizeType()]?.['edit']?.['input_validation_rules']
        console.log(validationRules)
        console.log(123)
        if (validationRules != null) {
            let validation = new Validator(data, validationRules);
            console.log(validation.passes())
            if (validation.fails()) {
                output = { validation: validation.errors, message: "Something went wrong." }
                return output
            }
        }
        var model = await this.getModel()
        var output = null
        try {
            const item = await model.update({
                where: {
                    id: id
                },
                data: data
            })
            output = item
        } catch (err) {
            output = { error: err, message: "Something went wrong." }
        }
        return output
    }

    async delete(id: Number) {
        console.log(id)
        var model = await this.getModel()
        var output = null
        try {
            const item = await model.delete({
                where: {
                    id: id
                }
            })
            output = item
            console.log('Deleted ' + model.singularizeType() + ' ' + id)
        } catch (err) {
            output = { error: err, message: "Something went wrong." }
        }
        return output
    }


}