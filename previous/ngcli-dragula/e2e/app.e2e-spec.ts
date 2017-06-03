import { NgcliDragulaPage } from './app.po';

describe('ngcli-dragula App', () => {
  let page: NgcliDragulaPage;

  beforeEach(() => {
    page = new NgcliDragulaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
