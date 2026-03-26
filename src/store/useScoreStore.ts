import { create } from 'zustand';

export type TeamId = 'teamA' | 'teamB';

export interface Team {
  name: string;
  color: string;
  score: number;
  sets: number;
  hasServe: boolean;
}

export interface ScoreState {
  teams: {
    teamA: Team;
    teamB: Team;
  };
  layout: {
    left: TeamId;
    right: TeamId;
  };
  incrementScore: (teamId: TeamId) => void;
  decrementScore: (teamId: TeamId) => void;
  addSet: (teamId: TeamId) => void;
  resetGame: () => void;
  swapSides: () => void;
  updateTeam: (teamId: TeamId, newData: Partial<Team>) => void;
  setServe: (teamId: TeamId) => void;
}

const initialState = {
  teams: {
    teamA: {
      name: 'LOCAL',
      color: '#8b5cf6',
      score: 0,
      sets: 0,
      hasServe: true,
    },
    teamB: {
      name: 'VISITA',
      color: '#22c55e',
      score: 0,
      sets: 0,
      hasServe: false,
    },
  },
  layout: {
    left: 'teamA' as TeamId,
    right: 'teamB' as TeamId,
  },
};

export const useScoreStore = create<ScoreState>((set) => ({
  ...initialState,

  incrementScore: (teamId: TeamId) =>
    set((state) => {
      const scoringTeam = state.teams[teamId];
      const otherTeamId = teamId === 'teamA' ? 'teamB' : 'teamA';
      const otherTeam = state.teams[otherTeamId];

      const newTeams = {
        ...state.teams,
        [teamId]: {
          ...scoringTeam,
          score: scoringTeam.score + 1,
          hasServe: true,
        },
        [otherTeamId]: {
          ...otherTeam,
          hasServe: false,
        },
      };

      return { teams: newTeams };
    }),

  decrementScore: (teamId: TeamId) =>
    set((state) => {
      const team = state.teams[teamId];
      if (team.score > 0) {
        return {
          teams: {
            ...state.teams,
            [teamId]: {
              ...team,
              score: team.score - 1,
            },
          },
        };
      }
      return state;
    }),

  addSet: (teamId: TeamId) =>
    set((state) => {
      const team = state.teams[teamId];
      return {
        teams: {
          ...state.teams,
          [teamId]: {
            ...team,
            sets: team.sets + 1,
          },
        },
      };
    }),

  resetGame: () =>
    set((state) => ({
      teams: {
        teamA: {
          ...state.teams.teamA,
          score: 0,
          sets: 0,
          hasServe: true,
        },
        teamB: {
          ...state.teams.teamB,
          score: 0,
          sets: 0,
          hasServe: false,
        },
      },
    })),

  swapSides: () =>
    set((state) => ({
      layout: {
        left: state.layout.right,
        right: state.layout.left,
      },
    })),

  updateTeam: (teamId: TeamId, newData: Partial<Team>) =>
    set((state) => ({
      teams: {
        ...state.teams,
        [teamId]: {
          ...state.teams[teamId],
          ...newData,
        },
      },
    })),

  setServe: (teamId: TeamId) =>
    set((state) => {
      const otherTeamId = teamId === 'teamA' ? 'teamB' : 'teamA';
      return {
        teams: {
          ...state.teams,
          [teamId]: {
            ...state.teams[teamId],
            hasServe: true,
          },
          [otherTeamId]: {
            ...state.teams[otherTeamId],
            hasServe: false,
          },
        },
      };
    }),
}));
