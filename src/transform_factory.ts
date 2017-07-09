
import * as ts from 'typescript'
import { Factory } from './transform'
import { DocEntry } from './types'

export class DocEntryFactory {
    count = 0

    interfaces: DocEntry[] = []
    classes: DocEntry[] = []

    Node (node: any): DocEntry {
      node.kind = ts.SyntaxKind[node.kind]
      node.id = this.generateId()
      return node
    }

    Token (node: any) {
      return this.Node(node)
    }

    Identifier (node: any) {
      return node.text
    }

    QualifiedName (node: any) {
      return this.Node(node)
    }

    ComputedPropertyName (node: any) {
      return this.Node(node)
    }

    Decorator (node: any) {
      return this.Node(node)
    }

    TypeParameterDeclaration (node: any) {
      return this.Node(node)
    }

    CallSignatureDeclaration (node: any) {
      return this.Node(node)
    }

    ConstructSignatureDeclaration (node: any) {
      return this.Node(node)
    }

    VariableDeclaration (node: any) {
      return this.Node(node)
    }

    VariableDeclarationList (node: any) {
      return this.Node(node)
    }

    ParameterDeclaration (node: any) {
      return this.Node(node)
    }

    BindingElement (node: any) {
      return this.Node(node)
    }

    PropertySignature (node: any) {
      return this.Node(node)
    }

    PropertyDeclaration (node: any) {
      return this.Node(node)
    }

    PropertyAssignment (node: any) {
      return this.Node(node)
    }

    ShorthandPropertyAssignment (node: any) {
      return this.Node(node)
    }

    SpreadAssignment (node: any) {
      return this.Node(node)
    }

    ObjectBindingPattern (node: any) {
      return this.Node(node)
    }

    ArrayBindingPattern (node: any) {
      return this.Node(node)
    }

    FunctionDeclaration (node: any) {
      return this.Node(node)
    }

    MethodSignature (node: any) {
      return this.Node(node)
    }

    MethodDeclaration (node: any) {
      return this.Node(node)
    }

    ConstructorDeclaration (node: any) {
      return this.Node(node)
    }

    SemicolonClassElement (node: any) {
      return this.Node(node)
    }

    GetAccessorDeclaration (node: any) {
      return this.Node(node)
    }

    SetAccessorDeclaration (node: any) {
      return this.Node(node)
    }

    IndexSignatureDeclaration (node: any) {
      return this.Node(node)
    }

    KeywordTypeNode (node: any) {
      return this.Node(node)
    }

    ThisTypeNode (node: any) {
      return this.Node(node)
    }

    FunctionTypeNode (node: any) {
      return this.Node(node)
    }

    ConstructorTypeNode (node: any) {
      return this.Node(node)
    }

    TypeReferenceNode (node: any) {
      return this.Node(node)
    }

    TypePredicateNode (node: any) {
      return this.Node(node)
    }

    TypeQueryNode (node: any) {
      return this.Node(node)
    }

    TypeLiteralNode (node: any) {
      return this.Node(node)
    }

    ArrayTypeNode (node: any) {
      return this.Node(node)
    }

    TupleTypeNode (node: any) {
      return this.Node(node)
    }

    UnionTypeNode (node: any) {
      return this.Node(node)
    }

    IntersectionTypeNode (node: any) {
      return this.Node(node)
    }

    ParenthesizedTypeNode (node: any) {
      return this.Node(node)
    }

    TypeOperatorNode (node: any) {
      return this.Node(node)
    }

    IndexedAccessTypeNode (node: any) {
      return this.Node(node)
    }

    MappedTypeNode (node: any) {
      return this.Node(node)
    }

    LiteralTypeNode (node: any) {
      return this.Node(node)
    }

    StringLiteral (node: any) {
      return this.Node(node)
    }

    OmittedExpression (node: any) {
      return this.Node(node)
    }

    PartiallyEmittedExpression (node: any) {
      return this.Node(node)
    }

    PrefixUnaryExpression (node: any) {
      return this.Node(node)
    }

    PostfixUnaryExpression (node: any) {
      return this.Node(node)
    }

    NullLiteral (node: any) {
      return this.Node(node)
    }

    BooleanLiteral (node: any) {
      return this.Node(node)
    }

    ThisExpression (node: any) {
      return this.Node(node)
    }

    SuperExpression (node: any) {
      return this.Node(node)
    }

    ImportExpression (node: any) {
      return this.Node(node)
    }

    DeleteExpression (node: any) {
      return this.Node(node)
    }

    TypeOfExpression (node: any) {
      return this.Node(node)
    }

    VoidExpression (node: any) {
      return this.Node(node)
    }

    AwaitExpression (node: any) {
      return this.Node(node)
    }

    YieldExpression (node: any) {
      return this.Node(node)
    }

    BinaryExpression (node: any) {
      return this.Node(node)
    }

    ConditionalExpression (node: any) {
      return this.Node(node)
    }

    FunctionExpression (node: any) {
      return this.Node(node)
    }

    ArrowFunction (node: any) {
      return this.Node(node)
    }

    RegularExpressionLiteral (node: any) {
      return this.Node(node)
    }

    NoSubstitutionTemplateLiteral (node: any) {
      return this.Node(node)
    }

    NumericLiteral (node: any) {
      return this.Node(node)
    }

    TemplateHead (node: any) {
      return this.Node(node)
    }

    TemplateMiddle (node: any) {
      return this.Node(node)
    }

    TemplateTail (node: any) {
      return this.Node(node)
    }

    TemplateExpression (node: any) {
      return this.Node(node)
    }

    TemplateSpan (node: any) {
      return this.Node(node)
    }

    ParenthesizedExpression (node: any) {
      return this.Node(node)
    }

    ArrayLiteralExpression (node: any) {
      return this.Node(node)
    }

    SpreadElement (node: any) {
      return this.Node(node)
    }

    ObjectLiteralExpression (node: any) {
      return this.Node(node)
    }

    PropertyAccessExpression (node: any) {
      return this.Node(node)
    }

    ElementAccessExpression (node: any) {
      return this.Node(node)
    }

    CallExpression (node: any) {
      return this.Node(node)
    }

    ExpressionWithTypeArguments (node: any) {
      return this.Node(node)
    }

    NewExpression (node: any) {
      return this.Node(node)
    }

    TaggedTemplateExpression (node: any) {
      return this.Node(node)
    }

    AsExpression (node: any) {
      return this.Node(node)
    }

    TypeAssertion (node: any) {
      return this.Node(node)
    }

    NonNullExpression (node: any) {
      return this.Node(node)
    }

    MetaProperty (node: any) {
      return this.Node(node)
    }

    JsxElement (node: any) {
      return this.Node(node)
    }

    JsxOpeningElement (node: any) {
      return this.Node(node)
    }

    JsxSelfClosingElement (node: any) {
      return this.Node(node)
    }

    JsxAttribute (node: any) {
      return this.Node(node)
    }

    JsxSpreadAttribute (node: any) {
      return this.Node(node)
    }

    JsxClosingElement (node: any) {
      return this.Node(node)
    }

    JsxExpression (node: any) {
      return this.Node(node)
    }

    JsxText (node: any) {
      return this.Node(node)
    }

    NotEmittedStatement (node: any) {
      return this.Node(node)
    }

    CommaListExpression (node: any) {
      return this.Node(node)
    }

    EmptyStatement (node: any) {
      return this.Node(node)
    }

    DebuggerStatement (node: any) {
      return this.Node(node)
    }

    MissingDeclaration (node: any) {
      return this.Node(node)
    }

    Block (node: any) {
      return this.Node(node)
    }

    VariableStatement (node: any) {
      return this.Node(node)
    }

    ExpressionStatement (node: any) {
      return this.Node(node)
    }

    IfStatement (node: any) {
      return this.Node(node)
    }

    DoStatement (node: any) {
      return this.Node(node)
    }

    WhileStatement (node: any) {
      return this.Node(node)
    }

    ForStatement (node: any) {
      return this.Node(node)
    }

    ForInStatement (node: any) {
      return this.Node(node)
    }

    ForOfStatement (node: any) {
      return this.Node(node)
    }

    BreakStatement (node: any) {
      return this.Node(node)
    }

    ContinueStatement (node: any) {
      return this.Node(node)
    }

    ReturnStatement (node: any) {
      return this.Node(node)
    }

    WithStatement (node: any) {
      return this.Node(node)
    }

    SwitchStatement (node: any) {
      return this.Node(node)
    }

    CaseBlock (node: any) {
      return this.Node(node)
    }

    CaseClause (node: any) {
      return this.Node(node)
    }

    DefaultClause (node: any) {
      return this.Node(node)
    }

    LabeledStatement (node: any) {
      return this.Node(node)
    }

    ThrowStatement (node: any) {
      return this.Node(node)
    }

    TryStatement (node: any) {
      return this.Node(node)
    }

    CatchClause (node: any) {
      return this.Node(node)
    }

    ClassDeclaration (node: any) {
      const converted = this.Node(node)
      this.classes.push(converted)
      return converted
    }

    ClassExpression (node: any) {
      return this.Node(node)
    }

    InterfaceDeclaration (node: any) {
      const converted = this.Node(node)
      this.interfaces.push(node)
      return converted
    }

    HeritageClause (node: any) {
      return this.Node(node)
    }

    TypeAliasDeclaration (node: any) {
      return this.Node(node)
    }

    EnumMember (node: any) {
      return this.Node(node)
    }

    EnumDeclaration (node: any) {
      return this.Node(node)
    }

    ModuleDeclaration (node: any) {
      return this.Node(node)
    }

    ModuleBlock (node: any) {
      return this.Node(node)
    }

    ImportEqualsDeclaration (node: any) {
      return this.Node(node)
    }

    ExternalModuleReference (node: any) {
      return this.Node(node)
    }

    ImportDeclaration (node: any) {
      return this.Node(node)
    }

    ImportClause (node: any) {
      return this.Node(node)
    }

    NamespaceImport (node: any) {
      return this.Node(node)
    }

    NamespaceExportDeclaration (node: any) {
      return this.Node(node)
    }

    ExportDeclaration (node: any) {
      return this.Node(node)
    }

    NamedImports (node: any) {
      return this.Node(node)
    }

    NamedExports (node: any) {
      return this.Node(node)
    }

    ImportSpecifier (node: any) {
      return this.Node(node)
    }

    ExportSpecifier (node: any) {
      return this.Node(node)
    }

    ExportAssignment (node: any) {
      return this.Node(node)
    }

    CommentRange (node: any) {
      return this.Node(node)
    }

    JSDocTypeExpression (node: any) {
      return this.Node(node)
    }

    JSDocAllType (node: any) {
      return this.Node(node)
    }

    JSDocUnknownType (node: any) {
      return this.Node(node)
    }

    JSDocArrayType (node: any) {
      return this.Node(node)
    }

    JSDocUnionType (node: any) {
      return this.Node(node)
    }

    JSDocTupleType (node: any) {
      return this.Node(node)
    }

    JSDocNonNullableType (node: any) {
      return this.Node(node)
    }

    JSDocNullableType (node: any) {
      return this.Node(node)
    }

    JSDocRecordType (node: any) {
      return this.Node(node)
    }

    JSDocTypeReference (node: any) {
      return this.Node(node)
    }

    JSDocOptionalType (node: any) {
      return this.Node(node)
    }

    JSDocFunctionType (node: any) {
      return this.Node(node)
    }

    JSDocVariadicType (node: any) {
      return this.Node(node)
    }

    JSDocConstructorType (node: any) {
      return this.Node(node)
    }

    JSDocThisType (node: any) {
      return this.Node(node)
    }

    JSDocLiteralType (node: any) {
      return this.Node(node)
    }

    JSDocRecordMember (node: any) {
      return this.Node(node)
    }

    JSDoc (node: any) {
      return this.Node(node)
    }

    JSDocUnknownTag (node: any) {
      return this.Node(node)
    }

    JSDocAugmentsTag (node: any) {
      return this.Node(node)
    }

    JSDocClassTag (node: any) {
      return this.Node(node)
    }

    JSDocTemplateTag (node: any) {
      return this.Node(node)
    }

    JSDocReturnTag (node: any) {
      return this.Node(node)
    }

    JSDocTypeTag (node: any) {
      return this.Node(node)
    }

    JSDocTypedefTag (node: any) {
      return this.Node(node)
    }

    JSDocPropertyTag (node: any) {
      return this.Node(node)
    }

    JSDocTypeLiteral (node: any) {
      return this.Node(node)
    }

    JSDocParameterTag (node: any) {
      return this.Node(node)
    }

    SourceFile (node: any) {
      return this.Node(node)
    }

    Bundle (node: any) {
      return this.Node(node)
    }

    protected generateId () {
      return ++this.count
    }

}

export default DocEntryFactory
