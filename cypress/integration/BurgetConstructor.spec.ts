/// <reference types="cypress" />

// @ts-ignore
describe('service is available', () => {
    it('should be available on localhost:3000', () => {
        cy.visit('http://localhost:3000')
        cy.get('h1').should('have.text', 'Соберите бургер')
        cy.get('.BurgerConstructor_emptyCartTitle__2evLR').should('have.text', 'Корзина пуста')
    });

    it('should open and close modal ingredient', () => {
        cy.contains('[class=RenderArticleIngredients_name__1cDX2]', 'Краторная булка N-200i').click()

        cy.contains('[class=IngredientsDetails_name__2kJQ1]', 'Краторная булка N-200i')

        cy.get('.Modal_startAnimContainer__3gJIx > svg').click()

        cy.get('.IngredientsDetails_container__3Ffk2').should('not.exist')
    })

    it('should drag and drop ingredients and bun', () => {
        const dataTransfer = new DataTransfer()

        cy.contains('[class=RenderArticleIngredients_name__1cDX2]', 'Краторная булка N-200i')
            .trigger('dragstart', {
                dataTransfer
            })

        cy.get('.BurgerConstructor_innerContainer__1KeOk').trigger('drop', {
            dataTransfer
        })

        cy.contains('[class=RenderArticleIngredients_name__1cDX2]', 'Соус Spicy-X')
            .trigger('dragstart', {
                dataTransfer
            })

        cy.get('.BurgerConstructor_innerContainer__1KeOk').trigger('drop', {
            dataTransfer
        })
    })

    it('should return modal and redirect for login as user not auth', () => {
        cy.get('button').contains('Оформить заказ').click()

        cy.get('a[class=OrderDetail_errorAuthLink__2De1W]').click()
    })

    it('user should be located in login page', () => {
        cy.url().should('eq', 'http://localhost:3000/login')
    })

    it('should do auth in app and make an order', () => {
        cy.get('input[name=email]').type('mr.korovin87@mail.ru')

        cy.get('input[name=password]').type('qwerty1')

        cy.get('button').should('have.text', 'Войти').click()

        cy.url().should('eq', 'http://localhost:3000/')

        cy.getCookie('accessToken').should('exist')

        cy.get('button').contains('Оформить заказ').click()

        cy.get('[class=OrderDetail_id__3Dd9S]', {timeout: 20000}).should('exist')

        cy.get('.Modal_startAnimContainer__3gJIx > svg').click()

        cy.get('.BurgerConstructor_emptyCartTitle__2evLR').should('have.text', 'Корзина пуста')
    })

});


