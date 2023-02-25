import { stringify, parse } from "../../app/src/circJson"

describe("core", () => {
  

  test("test1", () => {
    const cycled = {
      foo: {},
      bar: {}
    } as any
    
    cycled.foo.bar = cycled.bar
    cycled.bar.foo = cycled.foo
    
    expect(cycled.foo.bar).toBe(cycled.bar)
    expect(cycled.bar.foo).toBe(cycled.foo)
    
    let result = stringify(cycled) as any
    
    expect(result).toBe('{"foo":{"bar":{"foo":{"$ref":"#/foo"}}},"bar":{"$ref":"#/foo/bar"}}')
    
    result = parse(result)
    
    expect(result.foo.bar).toBe(result.bar)
    expect(result.bar.foo).toBe(result.foo)
  })



  test("test2", () => {
    const obj1 = {} as any
    const obj2 = { b: obj1 } as any
    obj1.a = obj2
    obj2.c = obj1.a
    obj2.d = obj1.a
    
    expect(obj1).toBe(obj2.b)
    expect(obj1).toBe(obj1.a.b)
    expect(obj1.a).toBe(obj1.a.c)
    expect(obj1.a).toBe(obj1.a.d)
    
    let result2 = stringify(obj1) as any
    
    expect(result2).toBe('{"a":{"b":{"$ref":"#"},"c":{"$ref":"#/a"},"d":{"$ref":"#/a"}}}')
    
    result2 = parse(result2)
    
    expect(result2).toBe(result2.a.b)
    expect(result2.a).toBe(result2.a.c)
    expect(result2.a).toBe(result2.a.d)
  })


  test("test3", () => {
    const cycled2 = {
      foo: {},
      bar: {}
    } as any
    
    cycled2.foo.bar = cycled2.foo
    cycled2.bar.foo = cycled2.bar
    
    expect(cycled2.foo.bar).toBe(cycled2.foo)
    expect(cycled2.bar.foo).toBe(cycled2.bar)
    
    let result3 = stringify(cycled2) as any
    
    expect(result3).toBe('{"foo":{"bar":{"$ref":"#/foo"}},"bar":{"foo":{"$ref":"#/bar"}}}')
    
    result3 = parse(result3)
    
    expect(result3.foo.bar).toBe(result3.foo)
    expect(result3.bar.foo).toBe(result3.bar)
  })


  test("test4", () => {
    const infos = {
      tasks: [
        {
          type: 'task',
          description: 'Finish inbox',
          createdOn: '2017-11-07T22:02:19.696Z'
        },
        {
          type: 'task',
          description: 'Make sure it works',
          createdOn: '2017-11-07T22:02:36.775Z'
        }
      ],
      notes: [
        {
          type: 'note',
          content: 'This is a note',
          createdOn: '2017-11-07T22:02:27.631Z'
        },
        {
          type: 'note',
          content: 'It\'s working, I think.',
          createdOn: '2017-11-07T22:02:44.442Z'
        }
      ],
      inbox: [],
    } as any

    infos.inbox[0] = infos.tasks[0]
    infos.inbox[1] = infos.tasks[0]
    infos.inbox[2] = infos.tasks[1]
    infos.inbox[3] = infos.tasks[1]

    expect(infos.inbox[0]).toBe(infos.tasks[0])
    expect(infos.inbox[1]).toBe(infos.tasks[0])
    expect(infos.inbox[2]).toBe(infos.tasks[1])
    expect(infos.inbox[3]).toBe(infos.tasks[1])

    let result4 = stringify(infos) as any

    expect(result4).toBe('{"tasks":[{"type":"task","description":"Finish inbox","createdOn":"2017-11-07T22:02:19.696Z"},{"type":"task","description":"Make sure it works","createdOn":"2017-11-07T22:02:36.775Z"}],"notes":[{"type":"note","content":"This is a note","createdOn":"2017-11-07T22:02:27.631Z"},{"type":"note","content":"It\'s working, I think.","createdOn":"2017-11-07T22:02:44.442Z"}],"inbox":[{"$ref":"#/tasks/0"},{"$ref":"#/tasks/0"},{"$ref":"#/tasks/1"},{"$ref":"#/tasks/1"}]}')

    result4 = parse(result4)

    expect(result4.inbox[0]).toBe(result4.tasks[0])
    expect(result4.inbox[1]).toBe(result4.tasks[0])
    expect(result4.inbox[2]).toBe(result4.tasks[1])
    expect(result4.inbox[3]).toBe(result4.tasks[1])
  })


  test("test5", () => {
    const cycled = {
      foo: {},
      bar: {},
      test: { $ref: "#/invalid" }
    } as any

    cycled.foo.bar = cycled.bar
    cycled.bar.foo = cycled.foo

    expect(cycled.foo.bar).toBe(cycled.bar)
    expect(cycled.bar.foo).toBe(cycled.foo)

    let result = stringify(cycled) as any

    expect(result).toBe('{"foo":{"bar":{"foo":{"$ref":"#/foo"}}},"bar":{"$ref":"#/foo/bar"},"test":{"$ref":"##/invalid"}}')

    result = parse(result)

    expect(result.foo.bar).toBe(result.bar)
    expect(result.bar.foo).toBe(result.foo)
    expect(result.test).not.toBe(undefined)
    expect(result.test.$ref).toBe('#/invalid')
  })




  test("test6", () => {
    const cycled = {
      foo: {},
      bar: {},
      test: { $ref: "/invalid" }
    } as any

    cycled.foo.bar = cycled.bar
    cycled.bar.foo = cycled.foo

    expect(cycled.foo.bar).toBe(cycled.bar)
    expect(cycled.bar.foo).toBe(cycled.foo)

    let result = stringify(cycled) as any

    expect(result).toBe('{"foo":{"bar":{"foo":{"$ref":"#/foo"}}},"bar":{"$ref":"#/foo/bar"},"test":{"$ref":"/invalid"}}')

    result = parse(result)

    expect(result.foo.bar).toBe(result.bar)
    expect(result.bar.foo).toBe(result.foo)
    expect(result.test).not.toBe(undefined)
    expect(result.test.$ref).toBe('/invalid')
  })


  
})