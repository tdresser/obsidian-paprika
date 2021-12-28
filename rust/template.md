---
uid: {{uid}}
hash: {{hash}}
rating: {{rating}}
created: {{created}}
---

# {{name}}

Via [{{source}}]({{source_url}}).

![photo]({{photo_url}})

## Description
{{#if servings}}
    {{servings}}
{{/if}}
{{#if description}}
    {{description}}
{{/if}}
{{#if notes}}
    {{notes}}
{{/if}}

## Ingredients
{{newlines_to_bullets ingredients}}

## Directions
{{directions}}

## Nutritional Info
{{nutritional_info}}