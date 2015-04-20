define(['phaser', 'LAMDAQuest'], function(Phaser, LAMDAQuest) {
  var game = LAMDAQuest.getLQ().game;

  var scriptable = {
    scriptableProperties: [],

    ifScript: null,

    intervalScript: null,

    intervalDelta: null,

    intervalEvent: null,

    displayName: null,

    timer: null,
  };

  return scriptable;
});