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
  modulos?: ChildrenItems[];
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
  modulos?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Mi Panel',
    main: [
      {
        state: 'catalogo',
        short_label: 'CT',
        name: 'Catálogo',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'institucion',
            name: 'Institución'
          },
          {
            state: 'compania',
            name: 'Compañía'
          },
          {
            state: 'tipo-empresa',
            name: 'Tipo Categoría'
          },
          {
            state: 'entidad',
            name: 'Entidad'
          },
          {
            state: 'clasificacion',
            name: 'Clasificación'
          },
          {
            state: 'empresa',
            name: 'Empresa'
          },
          {
            state: 'actividad-economica',
            name: 'Actividad Económica'
          },
          {
            state: 'departamento',
            name: 'Departamento'
          },
          {
            state: 'area',
            name: 'Área'
          }
        ]
      },
      {
        state: 'localization',
        short_label: 'L',
        name: 'Localización',
        icon: 'feather icon-gitlab',
        type: 'sub',
        children: [
          {state: 'provincia', name: 'Provincia'},
          {state: 'canton', name: 'Cantón'},
          {state: 'parroquia', name: 'Parroquia'},
          {state: 'sector', name: 'Sector'},
        ]
      },
      {
        state: 'nomina',
        short_label: 'N',
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
        state: 'formulario',
        short_label: 'FM',
        name: 'Formularios',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'list', name: 'Listado de Formularios'
          },
          {
            state: 'asign', name: 'Formulario - Categoría'
          },
          /*{
            state: 'catalogo',
            name: 'Catálogo',
            type: 'sub',
            icon: 'feather icon-gitlab',
            children: [
              {
                state: 'seccion', name: 'Sección'
              },
              {
                state: 'componente', name: 'Componente'
              },
            ]
          },*/


        ]
      },
      {
        state: 'inspeccion',
        short_label: 'I',
        name: 'Inspección',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'list',
            name: 'Listado de Inspecciones'
          },

        ]
      },
      {
        state: 'device',
        short_label: 'D',
        name: 'Dispositivos',
        type: 'sub',
        icon: 'feather icon-gitlab',
        children: [
          {
            state: 'list',
            name: 'Listado de Dispositivos'
          },
          {
            state: 'ubicar',
            name: 'Rastrear'
          },

        ]
      },

      /*{
        state: 'simple-page',
        short_label: 'S',
        name: 'Sample Page',
        type: 'link',
        icon: 'feather icon-file'
      },*/
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
      /*{
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
      },*/
      /*{
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
      }*/
    ]
  }
];


@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
