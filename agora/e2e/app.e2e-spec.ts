import { AgoraPage } from './app.po';

describe('agora App', () => {
  let page: AgoraPage;

  beforeEach(() => {
    page = new AgoraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
