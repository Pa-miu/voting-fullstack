import { List, Map } from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(voting) {
  if(!voting) {
    return [];
  }
  const [a, b] = voting.get('pair');
  const aVotes = voting.getIn(['tally', a], 0);
  const bVotes = voting.getIn(['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  }
  else if (bVotes > aVotes) {
    return [b];
  }
  else {
    return [a, b];
  }
}

export function next(state) {
  const entries = state.get('entries')
                        .concat(getWinners(state.get('vote')));

  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .remove('round')
                .set('winner', entries.first());
  }
  else {
    return state.merge({
      vote: Map({
        round: state.getIn(['vote', 'round'], 0) + 1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2),
    });
  }
}

export function vote(voteState, entry) {
  const currentPair = voteState.get('pair');
  if (currentPair.includes(entry)){
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );
  }
  else {
    return voteState;
  }
}
