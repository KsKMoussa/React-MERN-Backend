import {Schema, model } from 'mongoose'


const EventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    notes: {
        type: String
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

   user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

EventoSchema.method('toJSON',function() {
 const  { __v, _id, ...Object} = this.toObject();
 Object.id = _id;
 return Object;
}
)

export const EventoModel = model('Evento', EventoSchema);