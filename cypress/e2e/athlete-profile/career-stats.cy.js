const athleteWithStats = {
  data: {
    username: 'test-athlete',
    name: 'Test Athlete',
    photo_url: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tournaments: [],
    career_stats: [
      {
        sport_slug: 'basketball_5x5',
        sport_name: 'Basketball 5x5',
        tournaments_count: 2,
        stats: { points: 50.0, assists: 20.0 }
      }
    ]
  }
};

const athleteWithoutStats = {
  data: {
    username: 'test-athlete-no-stats',
    name: 'Test Athlete No Stats',
    photo_url: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tournaments: [],
    career_stats: []
  }
};

const signInAsLoggedInUser = win => {
  win.localStorage.setItem('token', 'fake-token');
  win.localStorage.setItem('username', 'logged-in-user');
};

describe('Athlete Profile - Career Stats', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v1/users/logged-in-user', {
      statusCode: 200,
      body: { data: { email: '', username: 'logged-in-user', organizations: [] } }
    });
    cy.intercept('GET', '**/v1/official-profiles/username/logged-in-user', {
      statusCode: 404,
      body: {}
    });
  });

  it('shows career stats section when athlete has stats', () => {
    cy.intercept('GET', '**/v1/athlete-profiles/username/test-athlete', {
      statusCode: 200,
      body: athleteWithStats
    }).as('getAthleteProfile');

    cy.visit('/Account/Profile/test-athlete', {
      onBeforeLoad: signInAsLoggedInUser
    });
    cy.wait('@getAthleteProfile');

    cy.get('.career-stats').should('exist');
  });

  it('shows sport name and tournament count in career stats', () => {
    cy.intercept('GET', '**/v1/athlete-profiles/username/test-athlete', {
      statusCode: 200,
      body: athleteWithStats
    }).as('getAthleteProfile');

    cy.visit('/Account/Profile/test-athlete', {
      onBeforeLoad: signInAsLoggedInUser
    });
    cy.wait('@getAthleteProfile');

    cy.get('.career-stats-sport')
      .first()
      .within(() => {
        cy.get('h3').should('exist');
        cy.get('.career-stats-tournament-count').should('exist');
      });
  });

  it('shows stat cards with total values', () => {
    cy.intercept('GET', '**/v1/athlete-profiles/username/test-athlete', {
      statusCode: 200,
      body: athleteWithStats
    }).as('getAthleteProfile');

    cy.visit('/Account/Profile/test-athlete', {
      onBeforeLoad: signInAsLoggedInUser
    });
    cy.wait('@getAthleteProfile');

    cy.get('.career-stat-card')
      .first()
      .within(() => {
        cy.get('.career-stat-total').should('exist');
      });
  });

  it('does not render career stats section when athlete has no stats', () => {
    cy.intercept(
      'GET',
      '**/v1/athlete-profiles/username/test-athlete-no-stats',
      {
        statusCode: 200,
        body: athleteWithoutStats
      }
    ).as('getAthleteProfileNoStats');

    cy.visit('/Account/Profile/test-athlete-no-stats', {
      onBeforeLoad: signInAsLoggedInUser
    });
    cy.wait('@getAthleteProfileNoStats');

    cy.get('.career-stats').should('not.exist');
  });
});
