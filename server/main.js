import { Meteor } from 'meteor/meteor';
import { CombatData } from '../imports/api/combatData';

Meteor.startup(() => {
  CombatData.remove({turn: { $gte: 0 }});
});