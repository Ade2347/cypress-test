/// <reference types="cypress" />

describe('First test suite', () => {
    beforeEach('visit url', () => {
        //visit url
        cy.visit('/')
    })

    it('first test', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //find element by tag
        cy.get('input')

        //find element by ID
        cy.get('#inputEmail1')

        //find element by class
        cy.get('.input-full-width')

        //find element by attribute name
        cy.get('[fullwidth]')

        //find element by attribute name and value
        cy.get('[placeholder="Email"]')

        //find element by entire class
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //find element by more than one attribute name
        cy.get('[fullwidth][placeholder="Email"]')

        //find element by tag, attribute, class, ID
        cy.get('input[fullwidth]#inputEmail1.input-full-width')

        //find element by cypress test ID
        cy.get('[data-cy="imputEmail1"]')

    })
    it('Second test', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //get - find element on the page globally
        //find - find child element by locator
        //contains - find HTML text by text and by locator

        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card','Horizontal form').find('button')
        cy.contains('nb-card','Horizontal form').contains('Sign in')

        //cypress chain and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('Saving subject of command', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('#inputEmail1').should('have.attr', 'placeholder', 'Email')
        cy.contains('nb-card','Using the Grid').find('#inputPassword2').should('have.attr', 'placeholder', 'Password')

        // using cypress alias
        cy.contains('nb-card','Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('#inputEmail1').should('have.attr', 'placeholder', 'Email')
        cy.get('@usingTheGrid').find('#inputPassword2').should('have.attr', 'placeholder', 'Password')

        // using then () method
        cy.contains('nb-card','Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('#inputEmail1').should('have.attr', 'placeholder', 'Email')
            cy.wrap(usingTheGrid).find('#inputPassword2').should('have.attr', 'placeholder', 'Password')
        })
    })
    it('Extracting text values', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[for="exampleInputEmail1"').should('contain', 'Email address')

        cy.get('[for="exampleInputEmail1"').then(label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        let testEmailaddress = 'test@test.com';
        cy.get('#exampleInputEmail1').type(testEmailaddress)
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', testEmailaddress)
  

    })
    it('Radio buttons', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButton => {
            cy.wrap(radioButton).eq(0).check({force:true}).should('be.checked')
            cy.wrap(radioButton).eq(1).check({force:true}).should('be.checked')
            cy.wrap(radioButton).eq(0).should('not.be.checked')
            cy.wrap(radioButton).eq(2).should('be.disabled')
        })
  

    })
    it('checkbox buttons', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Basic form').find('[type="checkbox"]').then(checkbox => {
            cy.wrap(checkbox).check({force: true}).should('be.checked')
        })
  

    })
    it('date picker', () => {
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // let date = new Date()
        // date.setDate(date.getDate() + 5)
        // console.log(date)


        cy.contains('nb-card','Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('.day-cell').not('.bounding-month').contains('21').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Mar 21, 2025')
            cy.wrap(input).should('have.value', 'Mar 21, 2025')
        })
  

    })

})