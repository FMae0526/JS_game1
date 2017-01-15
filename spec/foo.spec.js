describe('Foo', function(){
    var foo;
    beforeEach(function(){
        foo = new Foo();
    });

    it('should return name', function(){
        expect(foo.name()).toEqual('Foo');
    });
});
