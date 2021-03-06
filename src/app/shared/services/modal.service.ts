import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  rootViewContainer: ViewContainerRef;
  constructor(private factoryResolver: ComponentFactoryResolver) { }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent(component: any, params?) {
    this.rootViewContainer.clear();
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentRef = this.rootViewContainer.createComponent(factory);

    if( params ){
      componentRef.instance["datos"] = params.datos;
      componentRef.instance["modalBasic"] = params.modal;
      componentRef.instance["result"].subscribe( params.result ) ;
    }
  }

  addDynamicComponentParams(component: any, params?) {
    this.rootViewContainer.clear();
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentRef = this.rootViewContainer.createComponent(factory);

    if( params ){
      for(let row in params){
        componentRef.instance[row] = params[row];
      }
      // componentRef.instance["datos"] = params.datos;
    }
  }

}
