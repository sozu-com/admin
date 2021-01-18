

function viewMore($timeout) {
    return {
      restict: 'E',
      controllerAs: 'viewmore',
      template: '<li ng-show="viewmore.showViewMore" ng-style="viewmore.liSetStyle"><button ng-click="viewmore.showMoreLess()" ng-style="viewmore.btnSetStyle" type="button">{{viewmore.showMore?viewmore.showLessText:viewmore.showMoreText}}</button></li>',
      transclude: false,
      replace: true,
      scope: {
        list: '=',
        isStatic: '@'
      },
      bindToController: {
        limit: '@',
        showMoreText: '@',
        showLessText: '@',
        liStyle: '@',
        btnStyle: '@',
  
  
      },
      controller: function($scope) {
        const liDefaultStyle = {
            'display': 'flex',
            'align-items': 'center',
            'flex-flow': 'row wrap',
            'justify-content': 'center',
            'background': 'none'
          },
          btnDefaultstyle = {
            'font-size': '12px',
            'font-weight': 'bold',
            'outline': 'none',
            'color': '#4594d1',
            'background': 'none',
            'border': 'none',
            'padding': '5px'
          };
  
        this.liSetStyle = this.liStyle ? this.liStyle : liDefaultStyle;
        this.btnSetStyle = this.btnStyle ? this.btnStyle : btnDefaultstyle;
        this.showMore = false;
        this.showViewMore = false;
      },
      link: function(scope, elem, attr, ctrl, transclude) {
        ctrl.updateLi = (showLimited = false) => {
          $timeout(function() {
            let li = elem.parent().find('li');
            if (li.length - 1 > ctrl.limit) {
              Array.prototype.forEach.call(li, (node, i) => {
                if (i >= ctrl.limit && i !== li.length - 1)
                  node.style.display = showLimited ? 'block' : 'none';
              });
              ctrl.showViewMore = true;
            } else {
              ctrl.showViewMore = false;
            }
          }, 0);
        };
  
        if (!scope.isStatic) {
          scope.$watch('list', function(value) {
            ctrl.updateLi();
          });
        } else {
          ctrl.updateLi();
        }
  
        ctrl.showMoreLess = () => {
          ctrl.showMore = !ctrl.showMore;
          ctrl.updateLi(ctrl.showMore);
        };
  
      }
    };
  }
  
  angular.module('view.moreless', [])
    .directive('viewMoreLess', ['$timeout',viewMore]);
    
    
    
    
    