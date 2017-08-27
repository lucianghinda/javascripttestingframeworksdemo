import { Selector } from 'testcafe';

function readDataFromFile(file){
  var loader = require('csv-load-sync');
  return loader(file);
}

fixture('TrianglesTests').page('http://localhost');

test('Boundary Value Analysis Testing', async t => {

  //defining the inputs
  const input_values_and_results = readDataFromFile('./boundary_value_analysis_all_data.csv');
  const ticketMenu = Selector('a.nav-link').withText("Triangles");
  const ticketMenuV1 = Selector('a.dropdown-item').withAttribute('href','/user/6/trianglesone/new');
  const titlePage = Selector('h2.title');

  //defining the normal expected results
  //this is needed because the Selector for normal expected result is different than selector for error 
  //because the DOM looks different in those two cases (different pages)
  //in case of normal result the user is redirected to results page
  //in case of error the user remains in the same form
  const normalExpectedResults = ["Not a Triangle", "Equilateral", "Isosceles", "Scalene"]

  await t.navigateTo('/users/sign_in');
  await t
    .typeText(Selector('input').withAttribute('name', 'user[email]'), "lucian@example.com")
    .typeText(Selector('input').withAttribute('name', 'user[password]'), "test123test123test123")
    .click(Selector('input').withAttribute('type','submit'))
    
  await t
  .click(ticketMenu)
  .click(ticketMenuV1)
  .expect(titlePage.textContent).eql("Triangles v1");

  var a,b,c, expected_result; 

  for(let inputs of input_values_and_results){
    a = inputs['a'];
    b = inputs['b'];
    c = inputs['c'];
    
    expected_result = inputs['expected_result'];
  
    await t.navigateTo('/user/6/trianglesone/new')
    await t
    .typeText(Selector('input').withAttribute('name', 'triangle[a]'), a)
    .typeText(Selector('input').withAttribute('name', 'triangle[b]'), b)
    .typeText(Selector('input').withAttribute('name', 'triangle[c]'), c)
  
    await t.click(Selector('input').withAttribute('type','submit'))
  
    if (normalExpectedResults.includes(expected_result)){
      //if we are expecting to see the results page    
      await t
      .expect(Selector('h4.card-text').textContent).contains(expected_result);
    }
    else{
      //if we expect to see the form page with errors in it
      const errorCard = Selector('blockquote');
      await t
      .expect(errorCard.textContent).contains(expected_result);
    }
  }
  
});
