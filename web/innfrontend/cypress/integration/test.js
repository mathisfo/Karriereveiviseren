
describe("Home page renders", () => {
    it("renders page", () => {
      cy.visit("/home");
      cy.get("h2").contains("Velg Aktiviteter");
    });
  });

describe("Navbar renders", () => {
  it("renders navbar", () => {
    cy.get("[data-cy=Navbar]").contains("INN").should('be.visible')
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
    cy.get('input[name="restriction"]').type("1")
    cy.get('select').select('Utdanningsrettet')
    cy.get('input[name="classroom"]').type("https://gitlab.stud.idi.ntnu.no/inn01")
    cy.get('button').contains('Lagre tiltak').click();
    cy.get("[data-cy=Navbar]").get("[data-cy=homeLink]").click()
    cy.get("[data-cy=courseCard]").contains("My course").should('exist');
    
  });
});


describe("User can access more information about the course", () => {
  it("works", () => {
    cy.get("[data-cy=infoButton]:first").click()
    cy.get("p").should('be.visible');
    cy.get(".button").contains("Gå tilbake").click()
  });
});


describe("User can select a course and add it to their course list", () => {
  it("works", () => {
    cy.get("[data-cy=checkbox]").first().click();
    cy.get("[data-cy=accordion]").should('exist');
  });
});

describe("User can search for a course", () => {
  it("works", () => {
    cy.get("input[name=searchbar]").type('My course') 
    cy.get("[data-cy=courseHeader").each((item) => {
    cy.wrap(item).contains("My course")
    })
  })
})


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

describe('test for API', () => {
  it('loads 4 items', () => {
    cy.visit('http://127.0.0.1:8000/api-auth/login/?next=/login/')
    cy.get('input[name="username"]').type("admin")
    cy.get('input[name="password"]').type("admin")
    cy.get('input[name="submit"]').click()
    cy.request('http://127.0.0.1:8000/api/')
      .its('body')
      .should('have.length', 4)
  })
})