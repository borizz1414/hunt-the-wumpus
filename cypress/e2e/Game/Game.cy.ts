/// <reference types="cypress" />
describe('Game tests', () => {
    beforeEach(() => {

        cy.visit('localhost:4200')
    })

    it('should load config game page', () => {
        cy.get('[data-cy=cells-input').should('exist').type('20')
        cy.get('[data-cy=pits-input').should('exist').type('8');
        cy.get('[data-cy=arrows-input').should('exist').type('4')
        cy.get('[data-cy=btn-start-game').should('exist').click()
        cy.get('[data-cy=board-game').should('exist');
        cy.get('[data-cy=cells-game').should('exist');
        cy.get('[data-cy=instructions-game').should('exist');
    })
})
