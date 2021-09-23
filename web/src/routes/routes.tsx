import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import CategoryList from '../pages/Category/list/index';
import CategoryForm from '../pages/Category/form/index';
import CoursesList from '../pages/Courses/list/index';
import CoursesForm from '../pages/Courses/form/index';
import FileList from '../pages/File/list/index';
import FileForm from '../pages/File/form/index';
import ApiMG from '../pages/ApiMicrosoftGraph';
import MyOneDrive from '../pages/ApiMicrosoftGraph/MyOnedriveSearch/index';
import FileCourse from '../pages/File-course/index';
import FileCategory from '../pages/File-category/index';
import { isLogin } from '../util/index';

const PrivateRoute = ({ ...rest }: any) =>
  isLogin() ? (
    <Route component={rest.component} path={rest.path} exact={rest.exact} />
  ) : (
    <Redirect to="/" />
  );

const Routes: FC = () => {
  const exact: boolean = true;

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact={exact} />
        <PrivateRoute component={Home} path="/home" exact={exact} />
        <PrivateRoute component={ApiMG} path="/apimg" exact={exact} />
        <PrivateRoute component={MyOneDrive} path="/myonedrive" exact={exact} />
        <PrivateRoute
          component={CategoryForm}
          path="/category/form"
          exact={exact}
        />
        <PrivateRoute
          component={CategoryForm}
          path="/category/form/:id"
          exact={exact}
        />
        <PrivateRoute
          component={CategoryList}
          path="/category/list"
          exact={exact}
        />
        <PrivateRoute
          component={CoursesForm}
          path="/course/form"
          exact={exact}
        />
        <PrivateRoute
          component={CoursesForm}
          path="/course/form/:id"
          exact={exact}
        />
        <PrivateRoute
          component={CoursesList}
          path="/course/list"
          exact={exact}
        />
        <PrivateRoute component={FileForm} path="/file/form" exact={exact} />
        <PrivateRoute
          component={FileForm}
          path="/file/form/:id"
          exact={exact}
        />
        <PrivateRoute component={FileList} path="/file/list" exact={exact} />
        <PrivateRoute
          component={FileCourse}
          path="/file-course"
          exact={exact}
        />
        <PrivateRoute
          component={FileCategory}
          path="/file-category"
          exact={exact}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
