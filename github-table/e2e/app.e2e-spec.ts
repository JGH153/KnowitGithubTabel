import { GithubTablePage } from './app.po';

describe('github-table App', function() {
  let page: GithubTablePage;

  beforeEach(() => {
    page = new GithubTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
