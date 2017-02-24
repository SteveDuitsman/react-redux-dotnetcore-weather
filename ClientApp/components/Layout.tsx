import * as React from 'react';
import { NavMenu } from './NavMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export interface LayoutProps {
    body: React.ReactElement<any>;
}

export class Layout extends React.Component<LayoutProps, void> {
    public render() {
        return (
          <div>
            <MuiThemeProvider>
                <div className='container-fluid'>
                    <div className='row'>
                    <div className='col-sm-3'>
                        <NavMenu />
                    </div>
                    <div className='col-sm-9'>
                        { this.props.body }
                    </div>
                    </div>
                </div>
            </MuiThemeProvider>
          </div>
        );
    }
}
