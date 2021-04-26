/* funker ikke atm
describe("User can log in", () => {
  it("logs in", () => {
    cy.visit("localhost:3000")
    cy.get('input[name="username"]').type("admin")
    cy.get('input[name="password"]').type("admin")
    
  })
})
*/

describe("Home page renders", () => {
    it("renders page", () => {
      cy.visit("localhost:3000/courses");
      cy.get("h2").contains("Tiltak");
    });
  });

describe("Navbar renders", () => {
  it("renders navbar", () => {
    cy.get("[data-cy=Navbar]").contains("Aktiviteter").should('be.visible')
  });
});



describe("User can add a course", () => {
  it("works", () => {
    cy.get("[data-cy=Navbar]").get("[data-cy=coursesLink]").click()
    cy.get("[data-cy=addButton]").click()
    cy.get('input[name="title"]').type("My course")
    cy.get('input[name="description"]').type("My description")
    cy.get('input[name="startDate"]').type("2020-06-01T08:30")
    cy.get('input[name="endDate"]').type("2020-06-01T10:30")
    cy.get('input[name="shortDescription"]').type("My short description")
    cy.get('input[name="goal"]').type("My goal for this course")
    cy.get('[data-cy=form]').get('.button').contains('Lagre').click()
    cy.get('.button').contains("Gå tilbake").click()
    cy.get("[data-cy=Navbar]").get("[data-cy=homeLink]").click()
    cy.get("[data-cy=accordionTitle]").contains("My course").should('exist');
    
  });
});



describe("Added courses shows up in the timeline", () => {
  it("works", () => {
    cy.get("[data-cy=timeline]").contains("My course")
  }) 
})


describe("User can access more information about a course", () => {
  it("works", () => {
    cy.get("[data-cy=courseAccordion]:first").click()
    cy.get("[data-cy=infoButton]:first").click()
    cy.get("p").should('be.visible');
    cy.get(".button").contains("Gå tilbake").click()
  });
});



describe("User can select a course and add it to their course list", () => {
  it("works", () => {
    cy.get("[data-cy=checkbox]").first().click();
    cy.get("[data-cy=innaccordion]").should('exist');
  });
});


describe("User can search for a course", () => {
  it("works", () => {
    cy.get("input[name=searchbar]").type('inn course') 
    cy.get("[data-cy=courseAccordion]:first").click()
    cy.get("[data-cy=courseHeader]").each((item) => {
    cy.wrap(item).contains("INN Course")
    })
  })
})

/* funker ikke atm

describe("User can click google classroom link and get redirected", () => {
  it("redirects", () => {
    const obj = {
      openTab() {},
    }
    const spy = cy.spy(obj, 'openTab')
    cy.get("[data-cy=infoButton]:first").click()

    cy.get("[data-cy=classroom]").click()
    expect(spy).to.be.called
    
    cy.get(".button").contains("Gå tilbake").click()
    cy.get("input[name=searchbar]").clear()
  })
})
*/



describe("User can filter on restriction", () => {
  it("works", () => {
    cy.get("[data-cy=checkbox2]").click()
    
    cy.get("[data-cy=courseHeader").each((item) => {
    cy.wrap(item).contains("Spor 2")
      
    })

  })
})


// test for confirming that we are getting a JSON response from the GET /api call 

describe('test for API GET request', () => {
  it('returns JSON', () => {
    cy.visit('http://127.0.0.1:8000/api-auth/login/?next=/login/')
    cy.get('input[name="username"]').type("admin")
    cy.get('input[name="password"]').type("admin")
    cy.get('input[name="submit"]').click()
    cy.request('http://127.0.0.1:8000/api/')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })
})

/* funker ikke
describe('test for API', () => {
  it('loads 5 items', () => {
    cy.visit('http://127.0.0.1:8000/api-auth/login/?next=/login/')
    cy.get('input[name="username"]').type("admin")
    cy.get('input[name="password"]').type("admin")
    cy.get('input[name="submit"]').click()
    cy.visit('http://127.0.0.1:8000/api/')
      .its('body')
      .should('have.length', 5)
  })
})

*/

