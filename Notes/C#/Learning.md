
# C# Learning

## References

- [Microsoft C# Docs](https://docs.microsoft.com/zh-cn/dotnet/csharp/)

## Clean Code C#

### Naming guideline

Reference:

- [命名准则 - C# 文档](https://docs.microsoft.com/zh-cn/dotnet/standard/design-guidelines/naming-guidelines)
- [类型成员的命名 - C#文档](https://docs.microsoft.com/zh-cn/dotnet/standard/design-guidelines/names-of-type-members)

### Coding guideline

Reference:

- [Effective C#：50 Specific Ways to Improve Your C#](https://www.ctolib.com/docs/sfile/effective-csharp/index.html)
- [C# 编码约定（C# 编程指南） - C#文档](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/inside-a-program/coding-conventions)

- DO - Using `var` keyword when the type is obvious based on the right hand side of the assignment.
- DO NOT - Don't use `var` when the type is not apparent, like when calling a method.
- DO NOT - Don't catch `System.Exception`
- DO - Using the smallest Try block
- DO NOT - *Never catch an exception and ignore it. Enough said*
- DO NOT - LINQ queries should have no side effects

## [System.Collections](https://docs.microsoft.com/en-us/dotnet/api/system.collections?view=netframework-4.8) & [System.Collections.Generic](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic?view=netframework-4.8)

### Difference

`System.Collections.Generic` is type-safe. Some classes under the namespace:

- Dictionary<TKey,TValue>
- List<T>
- Queue<T>
- SortedList<TKey,TValue>
- Stack<T>
- HashSet<T>
- LinkedList<T>

`System.Collections` worked on object references, it can handle any type if object. but not type-safe.

- ArrayList
- Hashtable
- Queue
- SortedList
- Stack

References:

- [Why is Dictionary preferred over Hashtable in C#?](https://stackoverflow.com/questions/301371/why-is-dictionary-preferred-over-hashtable-in-c)
- [ArrayList vs List<T> in C#](https://stackoverflow.com/questions/2309694/arraylist-vs-list-in-c-sharp)
- [Proper way to initialize a C# dictionary with values?](https://stackoverflow.com/questions/17047602/proper-way-to-initialize-a-c-sharp-dictionary-with-values)

### Tips

Initialize array with numbers:

```csharp
int[] values = Enumerable.Range(1,10).ToArray();
List<int> nums = Enumerable.Range(1,10).ToList();
```

[All possible array initialization syntaxes](https://stackoverflow.com/questions/5678216/all-possible-array-initialization-syntaxes)

```csharp
string[] array = new string[2]; // creates array of length 2, default values
string[] array = new string[] { "A", "B" }; // creates populated array of length 2
string[] array = { "A" , "B" }; // creates populated array of length 2
string[] array = new[] { "A", "B" }; // created populated array of length 2
```

Initialize Dictionary with values & get/set values for Dictionary

References:

- [Proper way to initialize a C# dictionary with values?](https://stackoverflow.com/questions/17047602/proper-way-to-initialize-a-c-sharp-dictionary-with-values)
- [How to initialize a dictionary with a collection initializer (C# Programming Guide)](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/how-to-initialize-a-dictionary-with-a-collection-initializer)
- [Different ways of adding to Dictionary](https://stackoverflow.com/questions/1838476/different-ways-of-adding-to-dictionary)
- [Is there an IDictionary implementation that, on missing key, returns the default value instead of throwing?](https://stackoverflow.com/questions/538729/is-there-an-idictionary-implementation-that-on-missing-key-returns-the-default)

```csharp
Dictionary<string, int> dict = new Dictionary<string, int>(){
    { "a", 0 },
    { "b", 1 }
};

Dictionary<char, int> dict2 = new Dictionary<char, int>(){
    ['a'] = 0,
    ['b'] = 1
};

// Dictionary set value
dict["c"] = 1; // directly set value
dict.Add("c", 1); // error. you have to check is key already exists

// Dictionary get value safety & with default value
int res = 0; // set default value to 0
dict.TryGetValue("d", out res); // failed, res is 0
dict.TryGetValue("b", out res); // succees, res is 1 now
```

Initialize Object with values

References:

- [How to initialize objects by using an object initializer (C# Programming Guide)](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/how-to-initialize-objects-by-using-an-object-initializer)

```csharp
// example 1

public class Student
{
    public Student() {}
    public Student(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public string Name { get; set; }
    public int Age { get; set; }
    public int ID { get; set; }
}

// will using the constructor which has two parameters
Student s1 = new Student("mike", 21);

// the default constructor is invoked in processing this declaration, not the constructor that has two parameters
Student s2 = new Student
{
    Name: "mike",
    Age: 21
};

// also, only the default constructor is used to process object initializers
Student s3 = new Student
{
    ID = 111
};

Student s4 = new Student
{
    Name: "mike",
    Age: 21,
    ID: 111
};
```

```csharp
// example 2, initialize with indexer
// using the example from this page -> https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/how-to-initialize-objects-by-using-an-object-initializer

public class HowToIndexInitializer
{
    public class BaseballTeam
    {
        private string[] players = new string[9];
        private readonly List<string> positionAbbreviations = new List<string>
        {
            "P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"
        };

        public string this[int position]
        {
            // Baseball positions are 1 - 9.
            get { return players[position-1]; }
            set { players[position-1] = value; }
        }
        public string this[string position]
        {
            get { return players[positionAbbreviations.IndexOf(position)]; }
            set { players[positionAbbreviations.IndexOf(position)] = value; }
        }
    }

    public static void Main()
    {
        var team = new BaseballTeam
        {
            ["RF"] = "Mookie Betts",
            [4] = "Jose Altuve",
            ["CF"] = "Mike Trout"
        };

        Console.WriteLine(team["2B"]);
    }
}
```

## string & char

`string` is an object of type `String` whose value is text. Internally, the text is stored as a sequential read-only collection of `Char` object. The `Length` property of a string represents the number of `Char` object it contains, not the number of Unicode characters.

Although `string` is an object, but they are immutable, can not be changed after created.

### Tips

Char to number:

`char` and `int` can be mixed and matched in calculations. So we can directly use it as int.

Reference: [Convert character to its alphabet integer position?](https://stackoverflow.com/questions/20044730/convert-character-to-its-alphabet-integer-position)

```csharp
char a = 'a';
int diff = a - 1;

string[] letters = new string[]{ "a", "b" };
letters[a - 65];
```

---

Empty string

```csharp
string emptyStr = string.Empty; // equals ""

string.IsNullOrEmpty(empty); // true
string.IsNullOrEmpty(null); // true

string nullStr = null;
Console.WriteLine(nullStr == emptyStr); // false

Console.WriteLine(nullStr + emptyStr); // ""
```

Empty char: **There is no empty char literal**

Reference: [Why is there no Char.Empty list String.Empty?](https://stackoverflow.com/questions/3670505/why-is-there-no-char-empty-like-string-empty)

```csharp
char empty = ''; // not work

string sentence = "abced";
string[] arr = sentence.Split(''); // not worked as you expect
Console.Write(arr.Length); // 1

// if you need a symbol to mark empty char
char emptyChar = '\0'; // the Unicode "null"
```

---

Using `StringBuilder` for building huge string object.

```csharp
System.Text.StringBuilder builder = new System.Text.StringBuilder();

for (int i = 0; i < 1000000; i += 1) {
    builder.Append("thisistest ");
    // besides, we can append char to sb:
    // builder.Append('c');
}

Console.WriteLine(builder.ToString());

// init StringBuilder with string
System.Text.StringBuilder sb = new System.Text.StringBuilder("abc");
Console.WriteLine(sb[0]); // 'a'

// remove something from string
// public System.Text.StringBuilder Remove (int startIndex, int length);
builder.Remove(builder.Length - 1, 1);

// clear a string builder
// public System.Text.StringBuilder Clear ();
builder.Clear();
```

---

Using `TryParse` to determine if a string is a validate number

```csharp
int i = 0;
string s = "108";
bool res = int.TryParse(s, out i);
Console.WriteLine($"parse res: {res}, the number is: {i}"); // res -> true, i -> 108

string s2 = "1,3";
res = int.TryParse(s2, out i); // res is false
```

---

`$` token

insert `{` or `}` in `$""` -> using `{{` or `}}`

```csharp
Console.WriteLine($"this is {{example}}"); // this is {{example}}
```

`@` token

- To enable C# keywords to be used as identifiers.

```csharp
// for example
// for in csharp is a keyword, you can't use is as variable in normal case
string for = "for"; // error

// with @, you can mark keywords as identifiers
string @for = "for";
Console.WriteLine(@for); // for
```

- To indicate that a string literal is to be interpreted verbatim.

```csharp
string filename1 = @"c:\documents\files\u0066.txt";
string filename2 = "c:\\documents\\files\\u0066.txt";

Console.WriteLine(filename1);
Console.WriteLine(filename2);
// The example displays the following output:
//     c:\documents\files\u0066.txt
//     c:\documents\files\u0066.txt

string s1 = "He said, \"This is the last \u0063hance\x0021\"";
string s2 = @"He said, ""This is the last \u0063hance\x0021""";

Console.WriteLine(s1);
Console.WriteLine(s2);
// The example displays the following output:
//     He said, "This is the last chance!"
//     He said, "This is the last \u0063hance\x0021"
```

## Operators

### `?.` & `?[]` - null-conditional operators

- If a evaluates to `null`, the result of `a?.x` or `a?[x]` is `null`
- If a evaluates to non-null, the result of `a?.x` or `a?[x]` is the same as `a.x` or `a[x]`

```csharp
A?.B?.Do(c);
A?.B?[C];
```

### `??` & `??=` operators

The null-coalescing operator `??` returns the value of its left-hand operand if it isn't `null`; otherwise, it evaluates the right-hand operand and returns its result.

The null-coalescing assignment operator `??=` assigns the value of its right-hand operand to its left-hand operand only if the left-hand operand evaluates to `null`. The `??=` operator doesn't evaluate its right-hand operand if the left-hand operand evaluates non-null.

```csharp
List<int> numbers = null;
int? a = null;

(numbers ??= new List<int>()).Add(5);

numbers.Add(a ??= 1);
Console.WriteLine(string.Join(" ", numbers));  // output: 5 1
Console.WriteLine(a);  // output: 1
```

**The left-hand operand of the `??=` operator must be a variable, a property or an indexer element.**

### `^` - index from end

The `^n` means `length - n`, for example,

- `nums[^1]` means the last item in nums, `nums[nums.Length - 1]`
- `nums[^nums.Length]` means the first item, `nums[0]`

### `..` - range operator

range operator `a..b` means from a to b, contains both a and b (`[a, b)`):

- `a..b` -> [a, b)
- `a..` -> [a, ^0)
- `..b` -> [0, b)
- `..` -> [0, ^0)

```csharp
int[] numbers = new[] { 0, 10, 20, 30, 40, 50 };
int amountToDrop = numbers.Length / 2;

int[] rightHalf = numbers[amountToDrop..];
Display(rightHalf);  // output: 30 40 50

int[] leftHalf = numbers[..^amountToDrop];
Display(leftHalf);  // output: 0 10 20

int[] all = numbers[..];
Display(all);  // output: 0 10 20 30 40 50

void Display<T>(IEnumerable<T> xs) => Console.WriteLine(string.Join(" ", xs));
```

## Tuples

Tuple is a new feature in C#7.0, it requires the `System.ValueType` types.

### Initializers

```csharp
// initial tuples with values
string name = "tuple";
var tuple = (5, name);
Console.WriteLine(tuple.Item1); // 5
Console.WriteLine(tuple.Item2); // tuple

// or we can
tuple = (count: 5, name: name);

Console.WriteLine(tuple.count);
Console.WriteLine(tuple.name);
```

### Compare operation(==\!=) in tuples

Tuple types support the `==` and `!=` compare operations. These operations work by comparing each member of the left argument to each member of the right argument in order.

```csharp
var left = (a: 5, b: 10);
var right = (a: 5, b: 10);
Console.WriteLine(left == right); // true

// the names of the tuple members do not participate in tests
(int, int) anotherTuple = (5, 10);
Console.WriteLine(left == anotherTuple); // true, but the compiler will generate a warning

// besides, tuples may contain nested tuples
(int, (int, int)) another = (1, (2, 3));
```

### As method return values

```csharp
(int Count, string name) ExampleMethod(int n1, int n2)
{
    return (Count: n1 + n2, name: "example");
}

// var data = ExampleMethod(1, 2);
// (int Count, string name) data = ExampleMethod(1, 2);

// The most exciting things: you can deconstruction a tuple!
var (num, name) = ExampleMethod(1, 2);
// or
(int num, string name) = ExampleMethod(1, 2);
```

## Anonymous

### References

- [.NET中那些所谓的新语法之二：匿名类、匿名方法与扩展方法](https://www.cnblogs.com/edisonchou/p/4088959.html)
- [C# 的匿名类型为什么要限制属性为只读呢？](https://www.zhihu.com/question/24306120)

### Anonymous Types

Encapsulate a set of **read-only** properties into a single object without having to explicitly a type first. The type is generated by the compiler and is not available at the source code level. The type of each property is inferred by the compiler.

```csharp
// using var and new keywords
var obj = new { Name = "test", Amount = 10 };

Console.WriteLine($"NAME: {obj.Name}, AMOUNT: {obj.Amount}");

// anonymous type's properties are readonly
obj.Amount += 1; // compile error

obj = 1; // error, you can't change the type of anonymous variable
```

Using anonymous object as returned values - use `dynamic`

```csharp
dynamic GetAnonymousObj() {
    return new { Name = "test" };
}

var obj = GetAnonymousObj();
```

### Anonymous Methods & Lambda Expression

Any lambda expression can be converted to a `delegate` type

- If a lambda expression doesn't return a value, it can be converted to one of the `Action` delegate types
- Otherwise, it can be converted to ont of the `Func` delegate types

```csharp
Func<int, int, int> add = (int a, int b) => a + b;

Action greeting = delegate { Console.WriteLine("greeting"); };
Action<int> print = x => Console.WriteLine($"input is {x}");
```

[Local Function vs Lambda Expression](https://docs.microsoft.com/zh-cn/dotnet/csharp/local-functions-vs-lambdas)

## [Serialization in C#](https://docs.microsoft.com/zh-cn/dotnet/standard/serialization/)

<!-- TODO: -->

## LINQ

<!-- TODO: -->

**LINQ should have no side effects.**

### try/catch in LINQ expressions

Query expression won't trigger the exception when you generate the query if there has an error in the expression, when the query return the `IEnumerable<T>`, will not really executed it.

```csharp
// the foreach loop below is where the query really executed
string[] files = { "file1.txt", "file2.txt", "file3.txt" };

int SomeMethodThatMightThrowError(string file)
{
    if (file == "file2.text") throw new InvalidOperationException();
    // do something
    return 1;
}

var query =
    from file in files
    let n = SomeMethodThatMightThrowError(file)
    select n;

try
{
    foreach (var item in query) {
        Console.WriteLine($"Processing {item.ToString()}");
    }
}
catch (InvalidOperationException)
{
    Console.WriteLine("Invalid operation");
}

// or when we call ToList, ToArray, ToDictionary, ToLookUp, the query will executed immediately
IEnumerable<int> query2 =
    from file in files
    let n = SomeMethodThatMightThrowError(file)
    select n;

try
{
    int[] nums = query2.ToArray();
}
catch (InvalidOperationException)
{
    Console.WriteLine("Invalid operation");
}
```

## Properties

*Tips: using Property instead of Data Member - From <Effective C#>*

<!-- TODO: -->
