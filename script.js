import data from './data'

console.log('data', data)

const width = 1600, height = 2000
const r = 4

const colorScale = d3.scaleOrdinal()
  .domain(['s1', 's2', 's3', 's4', 's5'])
  .range(['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0'])
const xCenter = d3.scalePoint()
  .domain(['s1', 's2', 's3', 's4', 's5'])
  .range([0, width])

// const numNodes = 100
// const nodes = d3.range(oumNodes).map(function (d, i) {
//   return {
//     radius: 4,
//     category: i % 3
//   }
// })

const createNodes = function (o) {
  console.log('o', o)
  console.log(o.s2_f)
  console.log('Math.floor(o.s1_m)', Math.floor(o.s1_m))
  console.log('Math.floor(o.s1_f)', Math.floor(o.s1_f))
  console.log('Math.floor(o.s2_m)', Math.floor(o.s2_m))
  console.log('Math.floor(o.s2_f)', Math.floor(o.s2_f))
  console.log('Math.floor(o.s3_m)', Math.floor(o.s3_m))
  console.log('Math.floor(o.s3_f)', Math.floor(o.s3_f))
  console.log('Math.floor(o.s4_m)', Math.floor(o.s4_m))
  console.log('Math.floor(o.s4_f)', Math.floor(o.s4_f))
  console.log('Math.floor(o.s5_m)', Math.floor(o.s5_m))
  console.log('Math.floor(o.s5_f)', Math.floor(o.s5_f))
  const s1_m = d3.range(Math.floor(o.s1_m)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'male',
      category: 's1'
    }
  })
  const s1_f = d3.range(Math.floor(o.s1_f)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'female',
      category: 's1'
    }
  })
  const s2_m = d3.range(Math.floor(o.s2_m)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'male',
      category: 's2'
    }
  })
  const s2_f = d3.range(Math.floor(o.s2_f)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'female',
      category: 's2'
    }
  })
  const s3_m = d3.range(Math.floor(o.s3_m)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'male',
      category: 's3'
    }
  })
  const s3_f = d3.range(Math.floor(o.s3_f)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'female',
      category: 's3'
    }
  })
  const s4_m = d3.range(Math.floor(o.s4_m)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'male',
      category: 's4'
    }
  })
  const s4_f = d3.range(Math.floor(o.s4_f)).map((d, i) => {
    return {
      row: o.row,
      radius: r,
      gender: 'female',
      category: 's4'
    }
  })
  const s5_m = d3.range(Math.floor(o.s5_m)).map((d, i) => {
    return {
      radius: r,
      gender: 'male',
      category: 's5'
    }
  })
  const s5_f = d3.range(Math.floor(o.s5_f)).map((d, i) => {
    return {
      radius: r,
      gender: 'female',
      category: 's5'
    }
  })
  return [].concat(s1_m, s1_f, s2_m, s2_f, s3_m, s3_f, s4_m, s4_f, s5_m, s5_f)
}

console.log('createNodes', createNodes(data[0]))

function render (data, y) {
  const nodes = createNodes(data)

  const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(5))
  .force('x', d3.forceX().x(function (d) {
    console.log(xCenter(d.category))
    return xCenter(d.category)
  }))
  .force('collision', d3.forceCollide().radius(function (d) {
    return d.radius + 1
  }))
  .on('tick', ticked)

  function ticked () {
    const u = d3.select('svg g.g-' + y)
    .selectAll('circle')
    .data(nodes)

    u.enter()
    .append('circle')
    .attr('r', function (d) {
      return d.radius
    })
    .attr('class', d => d.category + ' age-' + d.row)
    .style('fill', d => (d.gender == 'female') ? 'tomato' : 'lime')
    // .style('fill', d => colorScale(d.category))
    .merge(u)
    .attr('cx', function (d) {
      return d.x
    })
    .attr('cy', function (d) {
      return d.y
    })

    u.exit().remove()
  }
}

data.forEach(function (d, i) {
  const y = 400 * i
  const g = d3.select('svg g').append('g')
    .attr('class', 'g-' + y)
    .attr('transform', 'translate(0,' + y + ')')
  g.append('text')
    .attr('x', 500)
    .attr('y', -50)
    .text(data[i].row)
  render(data[i], y)
})
