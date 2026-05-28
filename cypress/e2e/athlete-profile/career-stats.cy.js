describe('Athlete Profile - Career Stats', () => {
  it('shows career stats section when athlete has stats', () => {
    const username = Cypress.env('TEST_ATHLETE_USERNAME') || 'test-athlete';

    cy.visit(`/athlete-profile/${username}`);

    cy.get('.career-stats', { timeout: 10000 }).should('exist');
  });

  it('shows sport name and tournament count in career stats', () => {
    const username = Cypress.env('TEST_ATHLETE_USERNAME') || 'test-athlete';

    cy.visit(`/athlete-profile/${username}`);

    cy.get('.career-stats-sport', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('h3').should('exist');
        cy.get('.career-stats-tournament-count').should('exist');
      });
  });

  it('shows stat cards with total and average values', () => {
    const username = Cypress.env('TEST_ATHLETE_USERNAME') || 'test-athlete';

    cy.visit(`/athlete-profile/${username}`);

    cy.get('.career-stat-card', { timeout: 10000 })
      .first()
      .within(() => {
        cy.get('.career-stat-total').should('exist');
        cy.get('.career-stat-average').should('contain', '/ torneio');
      });
  });

  it('does not render career stats section when athlete has no stats', () => {
    const username =
      Cypress.env('TEST_ATHLETE_NO_STATS_USERNAME') || 'test-athlete-no-stats';

    cy.visit(`/athlete-profile/${username}`);

    cy.get('.career-stats').should('not.exist');
  });
});
