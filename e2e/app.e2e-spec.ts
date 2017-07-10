import { CampusRecruitmentSystemPage } from './app.po';

describe('campus-recruitment-system App', () => {
  let page: CampusRecruitmentSystemPage;

  beforeEach(() => {
    page = new CampusRecruitmentSystemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
