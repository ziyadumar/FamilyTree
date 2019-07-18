import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TestComponent implements OnInit {
  linedata = null;

  tree = null;
  nodes = null;
  links = null;

  svg = null;

  allNodes = null;

  constructor() {}

  ngOnInit() {
    console.log('asdf');
    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      width = 840,
      height = 600;
    const root = {
      name: '',
      id: 1,
      hidden: true,
      children: [
        {
          name: 'Q',
          id: 16,
          no_parent: true
        },
        {
          name: '',
          id: 2,
          no_parent: true,
          hidden: true,
          children: [
            {
              name: 'J',
              id: 12
            },
            {
              name: '',
              id: 100,
              no_parent: true,
              hidden: true,
              children: [
                {
                  name: 'ziyad',
                  id: 101
                },
                {
                  name: '',
                  id: 106,
                  hidden: true,
                  no_parent: true,
                  children: [
                    {
                      name: 'girl',
                      id: 104
                    },
                    {
                      name: 'boy',
                      id: 105
                    }
                  ]
                },
                {
                  name: 'huhu',
                  id: 103,
                  no_parent: true
                }
              ]
            },
            {
              name: 'L',
              id: 13,
              no_parent: true
            },
            {
              name: 'C',
              id: 3,
              no_parent: true
            },
            {
              name: '',
              id: 4,
              hidden: true,
              no_parent: true,
              children: [
                {
                  name: 'D',
                  id: 5
                },
                {
                  name: '',
                  id: 14,
                  hidden: true,
                  no_parent: true,
                  children: [
                    {
                      name: 'P',
                      id: 15
                    }
                  ]
                },
                {
                  name: 'E',
                  id: 6,
                  no_parent: true
                }
              ]
            },
            {
              name: 'K',
              id: 11
            },
            {
              name: 'G',
              id: 7,
              children: [
                {
                  name: 'H',
                  id: 8
                },
                {
                  name: 'I',
                  id: 9
                }
              ]
            }
          ]
        },
        {
          name: 'M',
          id: 10,
          no_parent: true,
          children: []
        }
      ]
    };
    const siblings = [
      {
        source: {
          id: 101
        },
        target: {
          id: 103
        }
      },
      {
        source: {
          id: 3,
          name: 'C'
        },
        target: {
          id: 11,
          name: 'K'
        }
      },
      {
        source: {
          id: 12,
          name: 'L'
        },
        target: {
          id: 13,
          name: 'J'
        }
      },
      {
        source: {
          id: 5,
          name: 'D'
        },
        target: {
          id: 6,
          name: 'E'
        }
      },
      {
        source: {
          id: 16,
          name: 'Q'
        },
        target: {
          id: 10,
          name: 'M'
        }
      }
    ];
    console.log('ola');
    this.allNodes = this.flatten(root);
    console.log(this.allNodes);
    this.tree = d3.layout.tree().size([width, height]);
    this.nodes = this.tree.nodes(root);
    this.links = this.tree.links(this.nodes);

    const svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg
      .selectAll('.link')
      .data(this.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', function(d: any) {
        if (d.target.no_parent) {
          return 'M0,0L0,0';
        }
        const diff = d.source.y - d.target.y;
        // 0.40 defines the point from where you need the line to break out change is as per your choice.
        const ny = d.target.y + diff * 0.4;

        this.linedata = [
          {
            x: d.target.x,
            y: d.target.y
          },
          {
            x: d.target.x,
            y: ny
          },
          {
            x: d.source.x,
            y: d.source.y
          }
        ];

        const fun = d3.svg
          .line()
          .x((t: any) => {
            return t.x;
          })
          .y((u: any) => {
            return u.y;
          })
          .interpolate('step-after');
        return fun(this.linedata);
      })
      // .style('fill', 'yellow')
      // .style('border-color', 'green')
      ;

    const allnodes = this.allNodes;

    svg
      .selectAll('.sibling')
      .data(siblings)
      .enter()
      .append('path')
      .attr('class', 'sibling')
      .attr('d', function(d: any) {
        console.log(d);
        console.log(allnodes);
        const start = allnodes.filter((v: any) => {
          console.log(v.id);
          console.log(d.source.id);
          if (d.source.id === v.id) {
            return true;
          } else {
            return false;
          }
        });
        // end point
        const end = allnodes.filter((v: any) => {
          if (d.target.id === v.id) {
            return true;
          } else {
            return false;
          }
        });
        // define teh start coordinate and end co-ordinate
        this.linedata = [
          {
            x: start[0].x,
            y: start[0].y
          },
          {
            x: end[0].x,
            y: end[0].y
          }
        ];
        const fun = d3.svg
          .line()
          .x((q: any) => {
            return q.x;
          })
          .y((p: any) => {
            return p.y;
          })
          .interpolate('linear');
        return fun(this.linedata);
      })
      // .style('fill', 'red')
      ;

    const nodes = svg
      .selectAll('.node')
      .data(this.nodes)
      .enter();

    nodes
      .append('rect')
      .attr('class', 'node')
      .attr('height', 20)
      .attr('width', 40)
      .attr('id', (d: any) => {
        return d.id;
      })
      .attr('display', (d: any) => {
        if (d.hidden) {
          return 'none';
        } else {
          return '';
        }
      })
      .attr('x', function(d: any) {
        return d.x - 20;
      })
      .attr('y', function(d: any) {
        return d.y - 10;
      })
      .on('click' , function(d: any)  {
        d.children = d.children ? null : d._children;
        console.log(d.name);
      })
      // .style('fill', 'red')
      // .style('border-radius', '10px')
      ;
    // Create the node text label.
    nodes
      .append('text')
      .text((d: any) => {
        return d.name;
      })
      .attr('x', function(d: any) {
        return d.x - 3;
      })
      .attr('y', function(d: any) {
        return d.y + 3;
      });
  }

  flatten(root) {
    const n = [];
    let i = 0;
    function recurse(node) {
      console.log(node);
      if (node.children) {
        console.log(node.children);
        node.children.forEach(recurse);
      }
      if (!node.id) {
        node.id = ++i;
      }
      n.push(node);
    }
    recurse(root);
    return n;
  }

}
