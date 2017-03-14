import { TryNg2Page } from './app.po';

describe('try-ng2 App', () => {
  let page: TryNg2Page;

  beforeEach(() => {
    page = new TryNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
