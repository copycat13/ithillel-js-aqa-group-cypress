const booksResponse = {
  books: [
    {
      isbn: '9781449325862',
      title: 'Git Pocket Guide',
      subTitle: 'A Working Introduction',
      author: 'Richard E. Silverman',
      publish_date: '2020-06-04T08:48:39.000Z',
      publisher: 'Malopys',
      pages: 234,
      description:
        'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp',
      website: 'http://chimera.labs.oreilly.com/books/1230000000561/index.html',
    },
    {
      isbn: '9781449331818',
      title: 'Learning JavaScript Design Patterns',
      subTitle: "A JavaScript and jQuery Developer's Guide",
      author: 'Addy Osmani',
      publish_date: '2020-06-04T09:11:40.000Z',
      publisher: 'Malopys',
      pages: 254,
      description:
        "With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da",
      website: 'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/',
    },
  ],
};

describe('network', () => {
  it('can stub server responces with object', () => {
    cy.intercept('GET', '/BookStore/v1/Books', booksResponse).as('getBooks');
    cy.visit('/books');
  });

  it('can stub server responces with fixture', () => {
    cy.intercept('GET', '/BookStore/v1/Books', {
      fixture: 'api/books.json',
    }).as('getBooks');
    cy.visit('/books');
  });

  it('can stub server responces with callback', () => {
    cy.intercept('GET', '/BookStore/v1/Books', (req) => {
      req.reply({
        books: [
          {
            isbn: '9781449325862',
            title: 'Git Pocket Guide',
            subTitle: 'A Working Introduction',
            author: 'Richard E. Silverman',
            publish_date: '2020-06-04T08:48:39.000Z',
            publisher: 'Malopys',
            pages: 234,
            description:
              'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp',
            website: 'http://chimera.labs.oreilly.com/books/1230000000561/index.html',
          },
        ],
      });
    }).as('getBooks');
    cy.visit('/books');
  });

  it('can send requests and check them', () => {
    cy.request('GET', '/BookStore/v1/Books').its('status').should('eq', 200);
    cy.request({
      url: '/BookStore/v1/Books',
      methd: 'GET',
      auth: 'asd', // Authorization: asd
      headers: {},
    }).then((resp) => {
      expect(resp.status).to.equal(200);
      expect(resp.body.books.length).to.equal(8);
      expect(resp.body.books[0].title).to.equal('Git Pocket Guide');
    });
  });
});
