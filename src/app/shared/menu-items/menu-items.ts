import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'My Panel',
    main: [
      {
        state: 'catalogo',
        short_label: 'A',
        name: 'Catalogo',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'institucion',
            name: 'Institución'
          },
          {
            state: 'compania',
            name: 'Compañia'
          },
          {
            state: 'tipo-empresa',
            name: 'Tipo Empresa'
          },
          {
            state: 'entidad',
            name: 'Entidad'
          },
          {
            state: 'clasificacion',
            name: 'Clasificacion'
          },
          {
            state: 'empresa',
            name: 'Empresa'
          },
          {
            state: 'actividad-economica',
            name: 'Actividad Economica'
          },
          {
            state: 'departamento',
            name: 'Departamento'
          },
          {
            state: 'area',
            name: 'Area'
          }
        ]
      },
      {
        state: 'nomina',
        short_label: 'A',
        name: 'Nomina',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'cargo',
            name: 'Cargo'
          },
          {
            state: 'colaborador',
            name: 'Colaborador'
          }
        ]
      },
      {
        state: 'simple-page',
        short_label: 'S',
        name: 'Sample Page',
        type: 'link',
        icon: 'feather icon-file'
      },
      /*{
        state: 'auth',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'feather icon-unlock',
        children: [
          {
            state: 'login',
            type: 'sub',
            name: 'Login Pages',
            children: [
              {
                state: 'simple',
                name: 'Simple',
                target: true
              }, {
                state: 'header-footer',
                name: 'Header & Footer',
                target: true
              }, {
                state: 'social',
                name: 'Social Icon',
                target: true
              }, {
                state: 'social-header-footer',
                name: 'Social Header & Footer',
                target: true
              }
            ]
          }, {
            state: 'registration',
            type: 'sub',
            name: 'Registration Pages',
            children: [
              {
                state: 'simple',
                name: 'Simple',
                target: true
              }, {
                state: 'header-footer',
                name: 'Header & Footer',
                target: true
              }, {
                state: 'social',
                name: 'Social',
                target: true
              }, {
                state: 'social-header-footer',
                name: 'Social Header & Footer',
                target: true
              }
            ]
          },
          {
            state: 'forgot',
            name: 'Forgot Password',
            target: true
          },
          {
            state: 'lock-screen',
            name: 'Lock Screen',
            target: true
          },
        ]
      },*/
      {
        state: 'user',
        short_label: 'U',
        name: 'User Profile',
        type: 'sub',
        icon: 'feather icon-users',
        children: [
          {
            state: 'profile',
            name: 'User Profile'
          }, {
            state: 'card',
            name: 'User Card'
          }
        ]
      },
      {
        state: 'advance',
        short_label: 'A',
        name: 'Advance',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'modal',
            name: 'Modal'
          },
          {
            state: 'notifications',
            name: 'Notifications'
          }
        ]
      }
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
