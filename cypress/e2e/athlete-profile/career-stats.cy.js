const athleteWithStats = {
  athlete_profile: {
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
        stats: [
          { slug: 'points', total: 50.0, average: 25.0 },
          { slug: 'assists', total: 20.0, average: 10.0 }
        ]
      }
    ]
  }
};

const athleteWithoutStats = {
  athlete_profile: {
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

describe('Athlete Profile - Career Stats', () => {
  it('shows career stats section when athlete has stats', () => {
    cy.intercept('GET', '**/v1/athlete-profiles/username/test-athlete', {
      statusCode: 200,
      body: athleteWithStats
    }).as('getAthleteProfile');

    cy.visit('/athlete-profile/test-athlete');
    cy.wait('@getAthleteProfile');

    cy.get('.career-stats').should('exist');
  });

  it('shows sport name and tournament count in career stats', () => {
    cy.intercept('GET', '**/v1/athlete-profiles/username/test-athlete', {
      statusCode: 200,
      body: athleteWithStats
    }).as('getAthleteProfile');

    cy.visit('/athlete-profile/test-athlete');
    cy.wait('@getAthleteProfile');

    cy.get('.career-stats-sport')
      .first()
      .within(() => {
        cy.get('h3').should('exist');
        cy.get('.career-stats-tournament-count').should('exist');
      });
  });

  it('shows stat cards with total and average values', () => {
    cy.intercept('GET', '**/v1/athlete-profiles/username/test-athlete', {
      statusCode: 200,
      body: athleteWithStats
    }).as('getAthleteProfile');

    cy.visit('/athlete-profile/test-athlete');
    cy.wait('@getAthleteProfile');

    cy.get('.career-stat-card')
      .first()
      .within(() => {
        cy.get('.career-stat-total').should('exist');
        cy.get('.career-stat-average').should('contain', '/ torneio');
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

    cy.visit('/athlete-profile/test-athlete-no-stats');
    cy.wait('@getAthleteProfileNoStats');

    cy.get('.career-stats').should('not.exist');
  });
});
