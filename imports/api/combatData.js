import { Mongo } from 'meteor/mongo';

const CombatData = new Mongo.Collection('battle');

CombatData.allow({
    remove(ownerId, doc) {
        return true;
    }
});

export {
    CombatData
};