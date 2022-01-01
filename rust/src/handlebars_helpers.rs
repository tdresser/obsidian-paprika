use handlebars::{Helper, Handlebars, Context, RenderContext, Output, HelperResult, JsonRender};

pub fn newlines_to_bullets(h: &Helper, _: &Handlebars, _: &Context, _: &mut RenderContext, out: &mut dyn Output) -> HelperResult {
    let param = h.param(0).unwrap();
    let bulleted = param.value().render().lines()        
        .map(|x| {
            x.to_string().retain(|c| !c.is_whitespace());
            if x.len() > 0 {
                "- ".to_string() + x
            } else {
                "".to_string()
            }
        })
        .collect::<Vec<_>>()
        .join("\n");
    out.write(&bulleted)?;
    Ok(())
}